import asyncWrapper from "../middleware/async.js"
import Response from "../common/Response.js"
import Constants from "../common/Constants.js"
import Attendance from "../models/Attendance.js"
import mongoose from 'mongoose';
import Student from "../models/Student.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import LeaveApplication from "../models/LeaveApplication.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

class Students {
    static register = asyncWrapper(async (req, res) => {
        Student.find({Email:req.body.Email}).then((user) => {
            if(user.length){
                let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, 'Student already registered', '');
                return res.send(data);
            }
            var newStudent = new Student(req.body);
            newStudent.hash_password = bcrypt.hashSync(req.body.password, 10);
            newStudent.save((err, student) => {
                if (err) {
                    let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, 'Student already registered', (err));
                    return res.send(data);

                } else {
                    student.hash_password = undefined;
                    let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, 'Student registered', (student));
                    return res.send(data);
                }
            });
        })
    })

    static sign_in = asyncWrapper(async (req, res) => {
        Student.findOne({
            Email: req.body.Email
        }, function (err, user) {
            if (err) throw err;
            if (!user || !user.comparePassword(req.body.Password)) {
                let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, 'Authentication failed. Invalid user or password.', (err));
                return res.send(data);
            }
            const updates = {};
            updates["Token"] = jwt.sign({ Email: user.Email, Name: user.Name, _id: user._id, Status: user.Status }, 'RESTFULAPIs', {
                expiresIn: '2h',
            });
            Student.findOneAndUpdate({ Email: req.body.Email }, {
                $set: updates
            }, { new: true })
                .then((data) => {
                    Student.aggregate([{
                        $match: {
                            _id: data._id
                        },
                    },
                    {
                        $project: {
                            Email: '$Email',
                            Name: '$Name',
                            Token: '$Token',
                        }
                    }], (err, loginData) => {
                        let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', (loginData));
                        return res.send(data);
                    })
                })

        });
    })


    static checkInOut = asyncWrapper(async (req, res) => {
        const studentId = req.params.studentId;

        Attendance.aggregate([
            {
                $match: {
                    studentId: mongoose.Types.ObjectId(studentId),
                    CheckInTime: {
                        $gt: new Date(
                            new Date().setHours(0, 0, 0, 0)
                        ),
                        $lte: new Date(
                            new Date().setHours(23, 59, 59, 999)
                        ),
                    },
                    Flag: false,
                },
            },
        ]).then((result) => {

            if (result.length > 0) {

                Attendance.findOneAndUpdate({ _id: result[0]._id }, { CheckOutTime: new Date(), Flag: true }, { new: true }).then((result) => {
                    let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', result);
                    return res.send(data);
                }).catch((err) => {
                    let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
                    return res.send(data);
                })
            } else {

                const attendance = new Attendance({
                    studentId: studentId,
                    CheckInTime: new Date(),
                    CheckOutTime: new Date(),
                    Flag: false
                })
                try {
                    attendance.save();
                    let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', attendance);
                    return res.send(data);
                } catch (err) {
                    let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, err);
                    return res.send(data);
                }
            }
        }).catch((err) => {
            let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
            return res.send(data);
        })

    })

    static monthSummary = asyncWrapper(async (req, res) => {

        const studentId = req.params.studentId;
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 2);
        if (!studentId) {
            let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, 'Student Id is required', '');
            return res.send(data);
        }
        Attendance.aggregate([
            {
                $match: {
                    studentId: mongoose.Types.ObjectId(studentId),
                    CheckInTime: {
                        $gt: firstDay,
                        $lte: lastDay,
                    }
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$CheckInTime",
                        },
                    },
                    // total: { $sum: 1 },
                    CheckInTime: { $first: "$CheckInTime" },
                    CheckOutTime: { $first: "$CheckOutTime" },
                    Present: { $sum: { $cond: [{ $eq: ["$Flag", true] }, 1, 0] } },
                },
            },

        ]).then((result) => {
            let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', result);
            return res.send(data);
        }).catch((err) => {
            let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
            return res.send(data);
        })
    }
    )

    static leaveApplication = asyncWrapper(async (req, res) => {
        const leaveApplication = new LeaveApplication({
            studentId: req.body.studentId,
            leaveType: req.body.leaveType,
            leaveFrom: req.body.leaveFrom,
            leaveTo: req.body.leaveTo,
            reason: req.body.reason,
            status: req.body.status,

        })

        leaveApplication.save((err, leave) => {
            if (err) {
                let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, 'Leave application not sent', (err));
                return res.send(data);

            } else {
                leave.hash_password = undefined;
                let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, 'Leave application sent', (leave));
                return res.send(data);
            }
        });
    })

    static leaveApplicationById = asyncWrapper(async (req, res) => {
        const studentId = req.params.studentId;
        LeaveApplication.aggregate([
            {
                $match: {
                    studentId: mongoose.Types.ObjectId(studentId),
                },
            },
        ]).then((result) => {
            let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', result);
            return res.send(data);
        }).catch((err) => {
            let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
            return res.send(data);
        })
    })

    static getAllquestion = asyncWrapper(async (req, res) => {
        Question.aggregate([
            {
                $lookup: {
                    from: "students",
                    localField: "teacherId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    questionId: "$_id",
                    question: "$question",
                    createAt: "$createAt",
                    lastDay: "$lastDay",
                    teacherName: "$user.Name",
                    teacherEmail: "$user.Email"
                }
            },
        ]).then((result) => {
            let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', result);
            return res.send(data);
        }).catch((err) => {
            let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
            return res.send(data);
        })
    })

    static postAnswer = asyncWrapper(async (req, res) => {
        var answer = new Answer(req.body);
        Answer.aggregate([
            {
                $match: {
                    $and: [
                        {
                            studentId: mongoose.Types.ObjectId(req.body.studentId)
                        },
                        {
                            questionId: mongoose.Types.ObjectId(req.body.questionId)
                        },
                    ],
                },
            },
        ]).then(async(ans) => {
            console.log('ans.length', ans)
            if (ans.length) {

                let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, 'Ans already exit', '');
                return res.send(data);
            }
            else {
                const question = await Question.find({ _id: mongoose.Types.ObjectId(req.body.questionId) })
                const date = new Date()
                console.log(question.lastDay > date, question, date)
                if (question[0].lastDay > date) {
                    answer.isUploadOnTime = true
                }
                else {
                    answer.isUploadOnTime = false
                }
                answer.save((err, question) => {
                    if (err) {
                        let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, '', (err));
                        return res.send(data);

                    } else {
                        let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, 'Question added', (question));
                        return res.send(data);
                    }
                });
            }
        })

    })

}

export default Students;


// const checkInTime = new Date('2023-02-16T04:42:07.257+00:00');
// const checkOutTime = new Date('2023-02-16T04:42:33.621+00:00');

// const timeDiff = checkOutTime - checkInTime;
// const seconds = Math.floor(timeDiff / 1000);
// const minutes = Math.floor(seconds / 60);
// const hours = Math.floor(minutes / 60);
// const remainingMinutes = minutes % 60;
// const remainingSeconds = seconds % 60;

// console.log(`Time difference: ${hours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds.`);
