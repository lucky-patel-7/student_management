const ChartUtil = {

    getCityWiseOptions: (item) => {
        let arr = [];
        item.forEach(element => {
            if (element._id != null && element._id != "" && element.city != null && element.city != "" && element.count != null && element.count != "") {
                arr.push(element.city);
            }
        }
        );
        return arr;
    },

    CityWiseGraphData: (item) => {

        var obj = [{ name: 'User', data: [] }];
        item.forEach(element => {
            if (element._id != null && element._id != "" && element.city != null && element.city != "" && element.count != null && element.count != "") {
                let arr = obj[0].data;
                arr.push(element.count);
            }
        }
        );

        return obj;
    },

    getTotalTimeSpendOptions: (item) => {

        let arr = [];
        item.forEach(element => {
            if (element.Name != null && element.Name != "")
                arr.push(element.Name);
        }
        );

        return arr;
    },

    TotalTimeSpendGraphData: (item) => {

        var obj = [{ name: 'User', data: [] }];
        item.forEach(element => {
            if (element.TotalHours != null && element.TotalHours != "") {
                let arr = obj[0].data;
                arr.push(element.TotalHours);
            }
        }
        );

        return obj;
    },

    getLateCountOptions: (item) => {

        let arr = [];
        item.forEach(element => {
            if (element.Name != null && element.Name != "")
                arr.push(element.Name);
        }
        );

        return arr;
    },

    getLateCountGraphData: (item) => {

        var obj = [{ name: 'User', data: [] }];
        item.forEach(element => {
            if (element.count != null && element.count != "") {
                let arr = obj[0].data;
                arr.push(element.count);
            }
        }
        );

        return obj;
    },

    getPresentCountOptions: (item) => {

        let arr = [];
        item.forEach(element => {
            if (element.Name != null && element.Name != "")
                arr.push(element.Name);
        }
        );

        return arr;
    },

    getPresentCountGraphData: (item) => {

        var obj = [{ name: 'User', data: [] }];
        item.forEach(element => {
            if (element.count != null && element.count != "") {
                let arr = obj[0].data;
                arr.push(element.count);
            }
        }
        );

        return obj;
    },

    getSubmitLessonOnTimeOptions: (item) => {

        let arr = [];
        item.forEach(element => {
            if (element.Name != null && element.Name != "")
                arr.push(element.Name);
        }
        );

        return arr;
    },

    getSubmitLessonOnTimeGraphData: (item) => {

        var obj = [{ name: 'User', data: [] }];
        item.forEach(element => {
            if (element.count != null && element.count != "") {
                let arr = obj[0].data;
                arr.push(element.count);
            }
        }
        );

        return obj;
    },
    getTotalSubmitLessonOptions: (item) => {

        let arr = [];
        item.forEach(element => {
            if (element.Name != null && element.Name != "")
                arr.push(element.Name);
        }
        );

        return arr;
    },

    getTotalSubmitLessonGraphData: (item) => {

        var obj = [{ name: 'User', data: [] }];
        item.forEach(element => {
            if (element.count != null && element.count != "") {
                let arr = obj[0].data;
                arr.push(element.count);
            }
        }
        );

        return obj;
    },

    getTotalNotSubmitLessonOptions: (item) => {

        let arr = [];
        item.forEach(element => {
            if (element.Name != null && element.Name != "")
                arr.push(element.Name);
        }
        );

        return arr;
    },

    getTotalNotSubmitLessonGraphData: (item, totalQuestions) => {

        var obj = [{ name: 'User', data: [] }];
        item.forEach(element => {
            if (totalQuestions > 0 && element.count > -1) {
                let arr = obj[0].data;
                arr.push(totalQuestions - element.count);
            }
        }
        );

        return obj;
    },

    getStudentWiseMonthlyScoreOptions: (item) => {

        let arr = [];
        var i = 1;
        item.forEach(element => {
            if (element.score > -1)
                arr.push("Question - " + i);
            i++
        }
        );

        return arr;
    },

    getStudentWiseMonthlyScoreGraphData: (item) => {

        var obj = [{ name: 'Student Score', data: [] }];
        item.forEach(element => {
            if (element.score > -1) {
                obj[0].data.push(element.score);
            }
        }
        );

        return obj;
    },

    getStudenLossScoreOptions: (item) => {
        let arr = [];
        item.forEach(element => {
            let name = element.data[0].name ? element.data[0].name : "No name"
            arr.push(name);
        });

        return arr;
    },

    getStudentLossScoreGraphData: (item) => {

        
        let arr = [];
        item.forEach(itemElement => {
            let obj = { name: '', data: [] };
            itemElement.data.forEach(element => {
                obj.data.push(element.totalScore)
            })

            arr.push(obj);
        })

        return arr;
    },

    getTeacherQuestionsOptions: (item) => {

        let arr = [];
        item.forEach(element => {
            if (element.month)
                arr.push(element.month);
        }
        );

        return arr;
    },

    getTeacherQuestionsGraphData: (item) => {

        var obj = [{ name: 'Teacher Question', data: [] }];
        item.forEach(element => {
            if (element.count > -1) {
                obj[0].data.push(element.count);
            }
        }
        );

        return obj;
    },

}

export default ChartUtil;