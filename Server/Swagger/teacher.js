/**
  * @swagger
  * tags:
  *   name: Teacher
  *   description: All Teacher API
*/

/**
 * @swagger
 * components:
 *  schemas:
 *    Student:
 *      type: object
 *      required:
 *        - id
 *        - Name
 *        - Email
 *        - city
 *        - Gender
 *        - DOB
 *        - Status
 *        - Type
 *        - Created
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated ID of the student
 *        Name:
 *          type: string
 *          description: The name of the student
 *        Email:
 *          type: string
 *          description: The email of the student
 *        city:
 *          type: string
 *          description: The city of the student
 *        Gender:
 *          type: string
 *          description: The gender of the student
 *        DOB:
 *          type: string
 *          format: date
 *          description: The date of birth of the student
 *        Status:
 *          type: boolean
 *          description: The status of the student
 *        Type:
 *          type: string
 *          description: The type of the student
 *        Created:
 *          type: string
 *          format: date-time
 *          description: The date and time when the student was created
 *      example:
 *        id: 60f1f9b0b8b5f8b0b8b5f8b0
 *        Name: "Karan"
 *        Email: "test@gmail.com"
 *        city: "Ahmedabad"
 *        Gender: "Male"
 *        DOB: "1998-01-01"
 *        Status: true
 *        Type: "Student"
 *        Created: "2021-07-19T10:25:36.000Z"
 */



/**
 * @swagger
 * /api/teacher/getAllStudents:
 *   get:
 *     summary: Get all students
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: The list of the students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */


/**
 * @swagger
 * /api/teacher/getQuestionsMonthly/{teacherId}:
 *   get:
 *     summary: Get all questions by month
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         schema:
 *           type: string
 *         required: true
 *         description: The teacherId
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:

 *       404:
 *         description: The book was not found
 */

/**
 * @swagger
 * /api/teacher/studentTotalLeave/{studentId}:
 *   get:
 *     summary: student total leave
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The studentId
 *     responses:
 *       200:
 *         description: The Student total leave
 *         contens:
 *           application/json:

 *       404:
 *         description: The book was not found
 */


/**
 * @swagger
 * /api/teacher/lessonsSubmittedCount:
 *   get:
 *     summary: Get total lessons submitted
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: The list of the lessons submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */


/**
 * @swagger
 * /api/teacher/getCityWiseStudentCount:
 *   get:
 *     summary: Get total students count by city
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: The list of the students count by city
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */


/**
 * @swagger
 * /api/teacher/getStudentMonthlyScore:
 *   get:
 *     summary: Get Student Monthly Score
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: The list of the Student Monthly Score
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */


/**
 * @swagger
 * /api/teacher/lessScores:
 *   get:
 *     summary: Get Student who have less score
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: The list of the Student who have less score
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

/**
 * @swagger
 * /api/teacher/lessonsOnTimeMonthly/{isUploadOnTime}:
 *   get:
 *     summary: Student who have uploaded lessons on time
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: isUploadOnTime
 *         schema:
 *           type: string
 *         required: true
 *         description:  true or false
 *     responses:
 *       200:
 *         description: The Student who have uploaded lessons on time
 *         contens:
 *           application/json:

 *       404:
 *         description: The book was not found
 */