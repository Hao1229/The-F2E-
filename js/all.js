
var app = new Vue({
    el: '#app',
    data: {
        start: false,
        startTime: 481, 
        minutes: 0,
        seconds: 10,
        counterId: {}, //用來儲存 setInterval 產生的 id
        setTime: 15,
    },
    methods: {
        controlTimer: function () {
            let vm = this;
            vm.start = !vm.start;
            //為了讓時間正確顯示，執行判斷式前先優先執行一次 時間轉換
            let minutes = Math.floor(vm.startTime / 60);
            let seconds = vm.startTime % 60;
            if (minutes < 10) {
                vm.minutes = '0' + minutes;
            }else {
                vm.minutes = minutes;
                vm.seconds = seconds;
            };
            if (seconds < 10) {
                vm.seconds = '0' + seconds;
            } else {
                vm.minutes = minutes;
                vm.seconds = seconds;
            };  
            //透過vm.start布林值決定是否執行setInterval
            if(vm.start == true){
                vm.counterId = window.setInterval(this.timeDecorate,1000); //將id存在counterId裡
            }else if(vm.start == false){
                window.clearInterval(vm.counterId); //暫停且清空counterId
                vm.counterId = {};
            }

        },
        timeDecorate: function () {
            let vm = this;
            vm.startTime -= 1
            let minutes = Math.floor(vm.startTime / 60);
            let seconds = vm.startTime % 60;
            if (minutes < 10) {
                vm.minutes = '0' + minutes;
            } else {
                vm.minutes = minutes;
                vm.seconds = seconds;
            };
            if (seconds < 10) {
                vm.seconds = '0' + seconds;
            } else {
                vm.minutes = minutes;
                vm.seconds = seconds;
            };
            if (vm.startTime == 0) {
                window.clearInterval(vm.counterId);
                vm.counterId = {};
            };

        },
        // 當點擊小方塊停止鈕時，時間會回到設定值也就是 setTime 且 setInterval 中止，並清空counterId
        resetTime:function(){
            let vm = this;
            vm.start = false;
            vm.startTime = vm.setTime;
            let minutes = Math.floor(vm.startTime / 60);
            let seconds = vm.startTime % 60;
            if (minutes < 10) {
                vm.minutes = '0' + minutes;
            } else {
                vm.minutes = minutes;
                vm.seconds = seconds;
            };
            if (seconds < 10) {
                vm.seconds = '0' + seconds;
            } else {
                vm.minutes = minutes;
                vm.seconds = seconds;
            };
            window.clearInterval(vm.counterId);
            vm.counterId = {};
        }
    },



});