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
router.get('/getStudentMonthlyScore/:studentId/:month',Teachers.getStudentMonthlyScore)
router.get('/lessScores',Teachers.lessScores)
router.get('/getQuestionsMonthly/:teacherId',Teachers.getQuestionsMonthly)
router.get('/studentTotalLeave/:studentId',Teachers.studentTotalLeave)
// router.get('/lessonsOnTime',Teachers.lessonsOnTime)
// router.get('/lessonsLate',Teachers.lessonsLate)
router.get('/lessonsOnTimeMonthly/:isUploadOnTime',Teachers.lessonsOnTimeMonthly)
router.get('/lessonsSubmittedCount',Teachers.lessonsSubmittedCount)
router.get('/totalPresent',Teachers.totalPresent)
router.get('/totalTimeSpent',Teachers.totalTimeSpent)
router.get('/isLateCount',Teachers.isLateCount)



export default router;
