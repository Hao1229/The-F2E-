
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
            }

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
        }
    },



});