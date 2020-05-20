const _name = Symbol('name');
const _email = Symbol('email');
const _homeworkResults = Symbol('homeworkResults');
const _failedHomeworksLimit = Symbol('failedHomeworksLimit');
const _studentsList = Symbol('studentsList');
class Student {
  constructor(name, email) {
    this[_name] = name;
    this[_email] = email;
    this[_homeworkResults] = [];
  }
  getName() {
    return this[_name];
  }
  getEmail() {
    return this[_email];
  }
  addHomeworkResult(topic, success) {
    this[_homeworkResults].push({ topic, success });
  }
  getHomeworkResults() {
    return this[_homeworkResults];
  }
}

class FrontendLab {
    constructor(students,failedLimit){
        this[_studentsList] = students;
        this[_failedHomeworksLimit] = failedLimit;
        this[_homeworkResults] = [];
    }
    printStudentsList(){
        //iterating through each student
        for (let i = 0; i < this[_studentsList].length; i++){
            let currentStudentEmail = this[_studentsList][i].email;
            let currentStudentHomeworksResults = [];
            //iterating through each homework results
            for (let j = 0; j < this[_homeworkResults].length; j++){
                let currentStudent = {};
                currentStudent.topic = this[_homeworkResults][j].topic;
                //iterating through each homework result to add success to student
                for (let k = 0; k < this[_homeworkResults][j].results.length; k++){
                    if (this[_homeworkResults][j].results[k].email === currentStudentEmail){
                        currentStudent.success = this[_homeworkResults][j].results[k].success;
                    }
                }
                currentStudentHomeworksResults.push(currentStudent)
            }
            console.log(`name: ${this[_studentsList][i].name}, email: ${this[_studentsList][i].email}`);
            console.log(currentStudentHomeworksResults);
        }
    }
    addHomeworkResult(homeworkResults){
        this[_homeworkResults].push(homeworkResults);
    }
    printStudentsEligibleForTest(){
        let currentStudentHomeworksResults = []
         //iterating through each student
         for (let i = 0; i < this[_studentsList].length; i++){
            let currentStudentEmail = this[_studentsList][i].email;
            let currentStudent = {};
            currentStudent.failed = 0;
            //iterating through each homework results
            for (let j = 0; j < this[_homeworkResults].length; j++){
                //iterating through each homework result to add success to student
                for (let k = 0; k < this[_homeworkResults][j].results.length; k++){
                    if (this[_homeworkResults][j].results[k].email === currentStudentEmail){
                        if(!this[_homeworkResults][j].results[k].success){
                            currentStudent.failed++;
                        }
                    }
                }

            }
            currentStudent.info = this[_studentsList][i];
            console.log(currentStudent)
            currentStudentHomeworksResults.push(currentStudent)
        }
        let succesiveStudents = currentStudentHomeworksResults.filter(stud => {
            return stud.failed <= this[_failedHomeworksLimit]
        })
        succesiveStudents.map(stud => {
            console.log(`name: ${stud.info.name}, email: ${stud.info.email}`);
            return delete stud.failed;
        })

    }

}