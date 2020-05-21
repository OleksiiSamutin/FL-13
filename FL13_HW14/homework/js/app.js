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
    return _homeworkResults.push({ topic, success });
  }
  this.getHomeworkResults = function() {
    return _homeworkResults;
  }
}
}


class FrontendLab {
    constructor(students,failedLimit){
        let _studentsList = students.map(stud => {
            return new Student(stud.name, stud.email);
        })
        let _failedHomeworksLimit = failedLimit;

        this.addHomeworkResults = function(homeworksResults){
            _studentsList.forEach(stud => {
              homeworksResults.results.forEach(HW => {
                if (stud.getEmail() === HW.email){
                  stud.addHomeworkResult(homeworksResults.topic,HW.success);
                }
              })
           })
        }
        this.printStudentsList = function(){
            _studentsList.forEach(stud => {
                console.log(`name: ${stud.getName()}, email: ${stud.getEmail()}`);
                console.log(stud.getHomeworkResults());
            })
        }
        this.printStudentsEligibleForTest = function(){
            _studentsList.forEach(stud => {
                let failed = 0;
                stud.getHomeworkResults().forEach(HW => {
                  if (!HW.success){
                    failed++;
                  }

                })
                if (failed <= _failedHomeworksLimit){
                    console.log(`name: ${stud.getName()}, email: ${stud.getEmail()}`);
                }
            })
        }
    }
}
