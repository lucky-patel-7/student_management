import express from 'express';
import Teachers from '../controllers/teacher.js';
const router = express.Router();



//add IsBlock after Auth 

router.post('/addQuestion', Teachers.addQuestion);
router.post('/allQuestion/:teacherId', Teachers.teacherQuestion);
router.post('/questionAns/:questionId',Teachers.questionAns)
router.get('/getAllStudents',Teachers.getAllStudents)
router.post('/addScores',Teachers.addScores)
router.get('/getCityWiseStudentCount',Teachers.getCityWiseStudentCount)
router.get('/getStudentMonthlyScore',Teachers.getStudentMonthlyScore)
router.get('/lessScores',Teachers.lessScores)
router.get('/getQuestionsMonthly/:teacherId',Teachers.getQuestionsMonthly)
router.get('/studentTotalLeave/:studentId',Teachers.studentTotalLeave)
// router.get('/lessonsOnTime',Teachers.lessonsOnTime)
// router.get('/lessonsLate',Teachers.lessonsLate)
router.get('/lessonsOnTimeMonthly/:isUploadOnTime',Teachers.lessonsOnTimeMonthly)
router.get('/lessonsSubmittedCount',Teachers.lessonsSubmittedCount)
router.get('/totalPresent',Teachers.totalPresent)



export default router;



import asyncWrapper from "../middleware/async.js"
import Response from "../common/Response.js"
import Constants from "../common/Constants.js"
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import mongoose from "mongoose";
import Student from "../models/Student.js";
import delay from "../common/Delay.js"
import Score from "../models/Scores.js";
import LeaveApplication from "../models/LeaveApplication.js";
import Attendance from "../models/Attendance.js";

class Teachers {
  static addQuestion = asyncWrapper(async (req, res) => {
    var newQuestion = new Question(req.body);
    newQuestion.save((err, question) => {
      if (err) {
        let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, '', (err));
        return res.send(data);

      } else {
        let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, 'Question added', (question));
        return res.send(data);
      }
    });
  })

  static teacherQuestion = asyncWrapper(async (req, res) => {

    let filter = { "$match": { $and: [{ teacherId: mongoose.Types.ObjectId(req.params.teacherId) }] } };
    const searchField = ["question"];

    if (req.body.Searchby != '' && req.body.Searchby != null) {
      const Searchbys = (typeof req.body.Searchby === 'object') ? req.body.Searchby : [req.body.Searchby];
      const matchField = searchField.map((field) => {
        return { [field]: { "$regex": Searchbys.join('|'), "$options": 'i' } };
      });
      if (filter['$match']['$and'] !== undefined) {
        filter['$match']['$and'].push({ $or: matchField });
      } else {
        filter = { "$match": { $and: [{ $or: matchField }] } }
      }
    }

    if (req.body.Month != '' && req.body.Month != null) {
      if (filter['$match']['$and'] !== undefined) {
        filter['$match']['$and'].push({ month: req.body.Month });
      } else {
        filter = { "$match": { $and: [{ month: req.body.Month }] } }
      }
    }

    Question.aggregate([
      {
        $addFields: {
          month: {
            $toString: {
              $month: "$createAt",
            },
          },
        },
      },
      filter, { "$sort": { "createAt": -1 } }])

      .then((result) => {
        let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', result);
        return res.send(data);
      }
      ).catch((err) => {
        let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
        return res.send(data);
      }
      )
  })

  static questionAns = asyncWrapper(async (req, res) => {
    let filter = { "$match": { $and: [{}] } };


    Student.aggregate([
      {
        $match: {},
      },
      {
        $project: {
          Name: "$Name",
          Email: "$Email",
        },
      },
    ]).then(async (students) => {

      for (let i = 0; i < students.length; i++) {
        let studentId = students[i]._id.toHexString()
        filter = {
          "$match": { $and: [{ studentId: mongoose.Types.ObjectId(studentId) }, { questionId: mongoose.Types.ObjectId(req.params.questionId) }] }
        };
        console.log('filter', JSON.stringify(filter))
        Answer.aggregate([
          filter
        ]).then((user) => {
          if (user.length) {
            students[i].status = true
            students[i].answer = user[0].answer
            students[i].date = user[0].createAt
            students[i].score = user[0].score
            students[i].isUploadOnTime = user[0].isUploadOnTime
          }
          else {
            students[i].status = false
          }
        })
      }
      await delay(100)
      if (req.body.FilterBy === "ByStatusSubmitted") {
        students = students.filter((student) => student.hasOwnProperty("answer"))
      }
      if (req.body.FilterBy === "BySubmittedOnTime") {
        students = students.filter((student) => student.isUploadOnTime === true)
      }
      if (req.body.FilterBy === "BySubmittedNotOnTime") {
        students = students.filter((student) => student.isUploadOnTime === false)
      }
      let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', students);
      return res.send(data);

    }).catch((err) => {
      let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
      return res.send(data);
    })
  })

  static getAllStudents = asyncWrapper(async (req, res) => {
    Student.find({}).then((students) => {

      let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', students);
      return res.send(data);
    }).catch((err) => {
      let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
      return res.send(data);
    })
  })

  static addScores = asyncWrapper(async (req, res) => {
    let newScore = new Score(req.body);
    newScore.save((err, score) => {
      if (err) {
        let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, '', (err));
        return res.send(data);
      } else {
        Answer.findOneAndUpdate({ studentId: req.body.studentId, questionId: req.body.questionId }, { score: req.body.score }, { new: true }, (err, answer) => {
          let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, 'Score added', score);
          return res.send(data);
        })
      }
    });
  })

  static getCityWiseStudentCount = asyncWrapper(async (req, res) => {

    Student.aggregate([
      {
        $group: {
          _id: "$city",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          city: "$_id",
          count: "$count",
        },
      },
    ]).then((result) => {
      let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', result);
      return res.send(data);
    }
    ).catch((err) => {
      let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
      return res.send(data);
    }
    )
  })

  static getStudentMonthlyScore = asyncWrapper(async (req, res) => {
    const monthlyScore = await Score.aggregate([
      {
        $addFields: {
          month: {
            $month: "$Created",
          },
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
            studentId: "$studentId",
          },
          totalScore: {
            $sum: "$score",
          },
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "_id.studentId",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: "$_id.studentId",
          month: "$_id.month",
          name: "$result.Name",
          totalScore: "$totalScore",
        },
      },
      {
        $group: {
          _id: "$_id",
          data: {
            $push: {
              month: "$month",
              name: "$name",
              totalScore: "$totalScore",
            },
          },
        },
      },
    ]);

    if (!monthlyScore || monthlyScore.length === 0) {
      let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, "No monthly score found for any student", "");
      return res.send(data);
    }

    let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, "Monthly score of all students", monthlyScore);
    return res.send(data);
  });

  static lessScores = asyncWrapper(async (req, res) => {
    Score.aggregate([
      {
        $addFields: {
          month: {
            $month: "$Created",
          },
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
            studentId: "$studentId",
          },
          totalScore: {
            $sum: "$score",
          },
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "_id.studentId",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: "$_id.studentId",
          month: "$_id.month",
          name: "$result.Name",
          totalScore: "$totalScore",
        },
      },
      {
        $match: {
          totalScore: {
            $lt: 30,
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          data: {
            $push: {
              month: "$month",
              name: "$name",
              totalScore: "$totalScore",
            },
          },
        },
      },
    ])
      .then((result) => {
        let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, 'Success', result);
        return res.send(data);
      })
      .catch((err) => {
        let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
        return res.send(data);
      });
  });

  static getQuestionsMonthly = asyncWrapper(async (req, res) => {

    const teacherId = req.params.teacherId;
    Question.aggregate([
      {
        $match: {
          teacherId: mongoose.Types.ObjectId(teacherId)
        },
      },
      {
        $addFields: {
          month: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createAt",
            },
          },
        },
      },
      {
        $group: {
          _id: "$month",
          count: {
            $sum: 1,
          },

        },
      },
      {
        $sort:

        {
          count: 1,
        },
      },
      {
        $project: {
          month: "$_id",
          count: "$count",
        },
      },
    ]).then((questions) => {
      let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', questions);
      return res.send(data);
    }).catch((err) => {
      let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
      return res.send(data);
    })

  });

  static studentTotalLeave = asyncWrapper(async (req, res) => {
    const studentId = req.params.studentId;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const count = [];
    const month = [];
    LeaveApplication.aggregate(
      [
        {
          $match: {
            studentId: mongoose.Types.ObjectId(studentId),
          },
        },
        {
          $addFields: {
            month: {
              $month: "$leaveFrom",
            },
          },
        },
        {
          $group: {
            _id: "$month",
            count: {
              $sum: 1,
            },
            studentId: {
              $first: "$studentId",
            },
          },
        },
        {
          $lookup: {
            from: "students",
            localField: "studentId",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $unwind: {
            path: "$result",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: "$studentId",
            month: "$_id",
            count: "$count",
            name: "$result.Name",
          },
        },
      ]
    ).then((leaves) => {
      // leaves.map((item, i) => {
      //   // count.splice(i, 0, item.count);
      //   month.splice(i, 0, item.month);
      // })

      // months.map((item, i) => {
      //   if(month.includes(i+1)){
      //    count.push(leaves[i].count);
      //   }else{
      //     count.push(0);
      //   }
      // })



      let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', { leaves });
      return res.send(data);
    }).catch((err) => {
      let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
      return res.send(data);
    })

  });

  // static lessonsOnTime = asyncWrapper(async (req, res) => {

  //   Answer.aggregate([
  //     {
  //       $match: {
  //         isUploadOnTime: true,
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: "$studentId",
  //         Count: {
  //           $sum: 1,
  //         },
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "students",
  //         localField: "_id",
  //         foreignField: "_id",
  //         as: "result",
  //       },
  //     },
  //     {
  //       $unwind: {
  //         path: "$result",
  //         preserveNullAndEmptyArrays: true,
  //       },
  //     },
  //     {
  //       $project: {
  //         Name: "$result.Name",
  //         Count: "$Count",
  //       },
  //     },
  //   ]).then((students) => {
  //     let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, 'Success', students);
  //     return res.send(data);
  //   }
  //   ).catch((err) => {
  //     let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
  //     return res.send(data);
  //   }
  //   )

  // })

  // static lessonsLate = asyncWrapper(async (req, res) => {

  //   Answer.aggregate([
  //     {
  //       $match: {
  //         isUploadOnTime: false,
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: "$studentId",
  //         Count: {
  //           $sum: 1,
  //         },
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "students",
  //         localField: "_id",
  //         foreignField: "_id",
  //         as: "result",
  //       },
  //     },
  //     {
  //       $unwind: {
  //         path: "$result",
  //         preserveNullAndEmptyArrays: true,
  //       },
  //     },
  //     {
  //       $project: {
  //         Name: "$result.Name",
  //         Count: "$Count",
  //       },
  //     },
  //   ]).then((students) => {
  //     let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, 'Success', students);
  //     return res.send(data);
  //   }
  //   ).catch((err) => {
  //     let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
  //     return res.send(data);
  //   }
  //   )

  // })

  static lessonsOnTimeMonthly = asyncWrapper(async (req, res) => {
    const status = req.params.isUploadOnTime;
    Student.aggregate([
      {
        $match: {},
      },
      {
        $project: {
          Name: "$Name",
          Email: "$Email",
        },
      },
    ]).then(async (students) => {
      for (let i = 0; i < students.length; i++) {
        const count = await Answer.countDocuments({
          studentId: mongoose.Types.ObjectId(students[i]._id)
          , isUploadOnTime: status
        })
        students[i] = { ...students[i], count: count }
      }
      let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', students);
      return res.send(data);
    }).catch((err) => {
      let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.ERROR, err, '');
      return res.send(data);
    })

  })

  static lessonsSubmittedCount = asyncWrapper(async (req, res) => {
    
    const totalQuestions = await Question.countDocuments({});
    const students = await Student.aggregate([
      {
        $project: {
          Name: '$Name',
          Email: '$Email',
          studentId: '$_id',
        },
      },
    ]);
  
    const promises = students.map(async (student) => {
      const count = await Answer.countDocuments({
        studentId: mongoose.Types.ObjectId(student.studentId)
      });
      student.count = count;
      return student;
    });
  
    const result = await Promise.all(promises);
  
    const data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', {totalQuestions,result});
  
    return res.send(data);
  })


  static totalPresent = asyncWrapper(async (req, res) => {

    const students = await Student.aggregate([
      {
        $project: {
          Name: '$Name',
          Email: '$Email',
          studentId: '$_id',
        },
      },
    ]);

    const promises = students.map(async (student) => {
      const count =  await Attendance.countDocuments({studentId: student._id , Flag: true });
      student.count = count;
      return student;
    });
  
    const result = await Promise.all(promises);
  
    const data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', {result});
  
    return res.send(data);


  
  });
  
 




}



export default Teachers;


//conver string into an array

