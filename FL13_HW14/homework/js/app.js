const _name = Symbol('name');
const _email = Symbol('email');
const _homeworkResults = Symbol('homeworkResults');
const _failedHomeworksLimit = Symbol('failedHomeworksLimit');
const _studentsList = Symbol('studentsList');
class Student {
  constructor(name, email) {
    let _name = name;
    let _email = email;
    let _homeworkResults = [];

  this.getName = function(){
    return _name;
  }
  this.getEmail = function(){
    return _email;
  }
  this.addHomeworkResult = function(topic, success) {
    _homeworkResults.push({ topic, success });
  }
  this.getHomeworkResults = function() {
    return _homeworkResults;
  }
}
}


class FrontendLab {
    constructor(students,failedLimit){
        let _studentsList = students;
        let _failedHomeworksLimit = failedLimit;
        let _homeworkResults = [];

    this.printStudentsList = function(){
        //iterating through each student
        for (let i = 0; i < _studentsList.length; i++){
            let currentStudentEmail = _studentsList[i].email;
            let currentStudentHomeworksResults = [];
            //iterating through each homework results
            for (let j = 0; j < _homeworkResults.length; j++){
                let currentStudent = {};
                currentStudent.topic = _homeworkResults[j].topic;
                //iterating through each homework result to add success to student
                for (let k = 0; k < _homeworkResults[j].results.length; k++){
                    if (_homeworkResults[j].results[k].email === currentStudentEmail){
                        currentStudent.success = _homeworkResults[j].results[k].success;
                    }
                }
                currentStudentHomeworksResults.push(currentStudent)
            }
            console.log(`name: ${_studentsList[i].name}, email: ${_studentsList[i].email}`);
            console.log(currentStudentHomeworksResults);
        }
    }
    this.addHomeworkResult = function(homeworkResults){
        _homeworkResults.push(homeworkResults);
    }
    this.printStudentsEligibleForTest = function(){
        let currentStudentHomeworksResults = []
         //iterating through each student
         for (let i = 0; i < _studentsList.length; i++){
            let currentStudentEmail = _studentsList[i].email;
            let currentStudent = {};
            currentStudent.failed = 0;
            //iterating through each homework results
            for (let j = 0; j < _homeworkResults.length; j++){
                //iterating through each homework result to add success to student
                for (let k = 0; k < _homeworkResults[j].results.length; k++){
                    if (_homeworkResults[j].results[k].email === currentStudentEmail){
                        if(!_homeworkResults[j].results[k].success){
                            currentStudent.failed++;
                        }
                    }
                }

            }
            currentStudent.info = _studentsList[i];
            currentStudentHomeworksResults.push(currentStudent);
        }
        let succesiveStudents = currentStudentHomeworksResults.filter(stud => {
            return stud.failed <= _failedHomeworksLimit;
        })
        succesiveStudents.map(stud => {
            console.log(`name: ${stud.info.name}, email: ${stud.info.email}`);
            return delete stud.failed;
        })

    }

}
}