
var app = new Vue({
    el: '#app',
    data: {
        start: false,
        startTime: 1500, 
        minutes: 25,
        seconds: '0'+0,
        counterId: {}, //用來儲存 setInterval 產生的 id
        setTime: 1500,
        settimeData: '', //用來儲存設定的時間，與input做雙向綁定
        newTodo:'',
        toDos:JSON.parse(localStorage.getItem('list')) || [],
        isBreak: false,
        openList: false,
    },
    methods: {
        controlTimer: function () {
            let vm = this;
            vm.start = !vm.start;
            //為了讓時間正確顯示，執行判斷式前先優先執行一次 時間轉換
            let minute = Math.floor(vm.startTime / 60);
            let seconds = vm.startTime % 60;
            if (minute < 10) {
                vm.minutes = '0' + minute;
            }else {
                vm.minutes = minute;
            };
            if (seconds < 10) {
                vm.seconds = '0' + seconds;
            } else {
                vm.seconds = seconds;
            };  
            //透過vm.start布林值決定是否執行setInterval
            if(vm.start == true){
                vm.counterId = window.setInterval(this.timeDecorate,1000); //將id存在counterId裡
            }else if(vm.start == false){
                window.clearInterval(vm.counterId); //暫停且清空counterId
                vm.counterId = {};
            };

        },
        timeDecorate: function () {
            let vm = this;
            vm.settimeData = '';
            vm.startTime -= 1
            let minute = Math.floor(vm.startTime / 60);
            let seconds = vm.startTime % 60;
            if (minute < 10) {
                vm.minutes = '0' + minute;
            } else {
                vm.minutes = minute;
            };
            if (seconds < 10) {
                vm.seconds = '0' + seconds;
            } else {
                vm.seconds = seconds;
            };
            if (vm.startTime == 0) {
                window.clearInterval(vm.counterId);
                vm.counterId = {};
                vm.isBreak = true;
                vm.start = false ;
                vm.setTime = 300;
                vm.startTime = vm.setTime;
                let minute = Math.floor(vm.startTime / 60);
                let seconds = vm.startTime % 60;
                if (minute < 10) {
                    vm.minutes = '0' + minute;
                } else {
                    vm.minutes = minute;
                };
                if (seconds < 10) {
                    vm.seconds = '0' + seconds;
                } else {
                    vm.seconds = seconds;
                };
            };

        },
        // 當點擊小方塊停止鈕時，時間會回到設定值也就是 setTime 且 setInterval 中止，並清空counterId
        resetTime:function(){
            let vm = this;
            vm.start = false;
            vm.startTime = vm.setTime;
            let minute = Math.floor(vm.startTime / 60);
            let seconds = vm.startTime % 60;
            if (minute < 10) {
                vm.minutes = '0' + minute;
            } else {
                vm.minutes = minute;
            };
            if (seconds < 10) {
                vm.seconds = '0' + seconds;
            } else {
                vm.seconds = seconds;
            };
            window.clearInterval(vm.counterId);
            vm.counterId = {};
        },
        settingTime:function(){
            let vm = this;
            if(vm.settimeData > 99){
                alert('不能超過兩位數');
                vm.settimeData = '';
                return;
            }else if(vm.settimeData < 0){
                alert('不能是負數');
                vm.settimeData = '';
                return;
            }
            vm.start = false;
            vm.setTime = vm.settimeData * 60;
            vm.startTime = vm.setTime;
            let minute = Math.floor(vm.startTime / 60);
            let seconds = vm.startTime % 60;
            if (minute < 10) {
                vm.minutes = '0' + minute;
            } else {
                vm.minutes = minute;
            };
            if (seconds < 10) {
                vm.seconds = '0' + seconds;
            } else {
                vm.seconds = seconds;
            };
            window.clearInterval(vm.counterId);
            vm.counterId = {};
        },
        addTodo: function(){
            let vm = this;
            let value = vm.newTodo.trim(); //為了不動到原value 回傳一個新value
           if(!value){
               alert('請填入內容');
               return
           };
           vm.toDos.push({
               title: value,
               finish: false,
           });
           vm.newTodo = ''; 
        },
        todoChange: function(item,index){
            let vm = this;
            let oriIndex = vm.toDos.indexOf(item);
            vm.toDos.splice(0,1,...vm.toDos.splice(oriIndex,1,vm.toDos[0]));
            this.resetTime();
        },
        deleteFinish:function(){
            let vm = this;
            for(let i = 0; i < vm.toDos.length; i++){
                if(vm.toDos[i].finish == true){
                    vm.toDos.splice(i,1);
                    i-=1;
                }
            }
        },
        goBreak:function(){
            let vm = this;
            window.clearInterval(vm.counterId);
            vm.counterId = {};
            vm.isBreak = true;
            vm.start = false ;
            vm.setTime = 300;
            vm.startTime = vm.setTime;
            let minute = Math.floor(vm.startTime / 60);
            let seconds = vm.startTime % 60;
            if (minute < 10) {
                vm.minutes = '0' + minute;
            } else {
                vm.minutes = minute;
            };
            if (seconds < 10) {
                vm.seconds = '0' + seconds;
            } else {
                vm.seconds = seconds;
            };
        },
        goWork:function(){
            let vm = this;
            window.clearInterval(vm.counterId);
            vm.counterId = {};
            vm.isBreak = false;
            vm.start = false ;
            vm.setTime = 1500;
            vm.startTime = vm.setTime;
            let minute = Math.floor(vm.startTime / 60);
            let seconds = vm.startTime % 60;
            if (minute < 10) {
                vm.minutes = '0' + minute;
            } else {
                vm.minutes = minute;
            };
            if (seconds < 10) {
                vm.seconds = '0' + seconds;
            } else {
                vm.seconds = seconds;
            };
        },
        strokeDasharray:function(r){
            return r * 2 * Math.PI;
        },
        strokeDashoffset:function(r,el){
            return (this.strokeDasharray(r) * el );
        },
       
    },
    computed:{
        firstThing:function(){
            let vm = this;
            return vm.toDos.filter(function(item,index){
                return index === 0;
            })
        },
        secondThing:function(){
            let vm = this;
            return vm.toDos.filter(function(item,index){
                return index === 1;
            })
        },
        thirdThing:function(){
            let vm = this;
            return vm.toDos.filter(function(item,index){
                return index === 2;
            })
        },
        fourthThing:function(){
            let vm = this;
            return vm.toDos.filter(function(item,index){
                return index === 3;
            })
        },
    },
    watch:{
        toDos:{
            handler(){
                localStorage.setItem('list',JSON.stringify(this.toDos));
            },
            deep:true
        }
    }



});


//jQuery

//製作右列按鈕hover動畫
$(document).ready(function () {
    $('.fa-trash-alt,.fa-music,.fa-chart-bar,.fa-list-ul,.fa-mug-hot,.fa-tools').hover(function () {
            // over
            $(this).toggleClass('animated swing');
        }
    );

});

