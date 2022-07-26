//檢查是否為移動端


let 移動端訊息 = document.getElementById('移動端訊息');
let 移動端 = false;

if (isMobile()) {
  移動端訊息.style.display="block";
  移動端 = true;
}

function isMobile() {
  let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return flag;
}

//初始化畫布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

m = document.getElementById('m');
let 視窗高度 = window.innerHeight;
let width = canvas.width = m.clientHeight;
let height = canvas.height = m.clientHeight;
document.getElementById('t').innerHTML = `輸出尺寸 =`;

ctx.fillStyle = `hsla(60,100%,70%,1)`;
ctx.fillRect(0,0,width,height);

//視窗大小變動偵測

window.onresize = function() {
  視窗高度 = window.innerHeight;
  width = canvas.width = m.clientHeight;
  height = canvas.height = m.clientHeight;
  ctx.fillStyle = `hsla(60,100%,70%,1)`;
  ctx.fillRect(0,0,width,height);
  document.getElementById('t').innerHTML = `輸出尺寸 =`;
}


//滾輪狀態檢測


// 滑鼠位子監聽



let mouse = {
  x : 0,
  y : 0,
  未修正x : 0,
  未修正y : 0,
  界內 : false, 
  按下滑鼠時在界內 :false,
}

window.addEventListener('mousemove',(event) => {
  mouse.未修正x = mouse.x = event.clientX + 頁面容器.scrollLeft;
  mouse.未修正y = mouse.y = event.clientY + 頁面容器.scrollTop;
  mouse.界內 = true;

  if(視窗高度<550){
    mouse.未修正x = mouse.x += (550-視窗高度)/2;
    mouse.未修正y = mouse.y += (550-視窗高度)/2;

  }

  if(mouse.x<125){
    mouse.x=125;
    mouse.界內 = false;
  }
  if(mouse.x>125+height){
    mouse.x=125+height;
    mouse.界內 = false;
  }
  if(mouse.y<125){
    mouse.y=125;
    mouse.界內 = false;
  }
  if(mouse.y>125+height){
    mouse.y=125+height;
    mouse.界內 = false;
  }

  if(整數模式==false){
    mouse.x-=0.5;
    mouse.y-=0.5;
  }

  mouse.x-=125;
  mouse.y-=125;
  mouse.未修正x-=125;
  mouse.未修正y-=125;

  if(輸出尺寸 !== height){
    滑鼠對齊輸出尺寸();
  }
  
  
  if(滑鼠按著 == true&&對齊模式 == true){
    對齊函數();
  }
  


})


//變數群

let curves = [];
let lastCurves = [];
let lastCurves已使用 = false;
let 被選取到的點 = [];
let 輸出尺寸 = 100;
let 原點x = 輸出尺寸/2;
let 原點y = 輸出尺寸/2;
let 整數模式 = true;
let 比例尺長度 = 輸出尺寸;

if(原點x%1!==0){
  原點y = 原點x = (輸出尺寸+1)/2;
}

let 滑鼠按著 = false;
let 路徑頭尾圓點半徑 = 5.5;
let 貝茲控制點圓點半徑 = 4.5;
let keyN已被按下 = false;
let 矩形選取模式 = false;
let 移動前原始座標x;
let 移動前原始座標y;
let 未修正移動前原始座標x;
let 未修正移動前原始座標y;
let 移動發生 = false;
let 時光機 = [];
let 時光機索引 = 0;
let 矩形左上x;
let 矩形左上y;
let 矩形右下x;
let 矩形右下y;
let 對齊模式 = false;
let 抓著的點;
let 點擊誤差x;
let 點擊誤差y;
let 網格開啟 = true;
let 計時器 = 0;
let 更新延遲;
let 代碼 = "代碼將生成於此處";
let 點擊在按鈕處 = false;
let 焦點;
let 連擊間隔檢測 = 0;
let 上次滑鼠位子x = 0;
let 上次滑鼠位子y = 0;
let 重置延遲 = 50;
let 重置倒數 = 0;
let 重置計數 = 0;

//125= 畫布距離頁面邊界距離

document.addEventListener('mousedown', 按下滑鼠);
document.addEventListener('mouseup', 滑鼠放開);
//document.addEventListener('click', createNewCurve);
document.addEventListener('keydown', 按下鍵盤);
document.addEventListener('keyup', 鬆開鍵盤);
let 按鈕 = document.getElementById('按鈕');
let 新增線段按鈕 = document.getElementById('新增線段');
新增線段按鈕.addEventListener("click", createNewCurve);
let 刪除線段按鈕 = document.getElementById('刪除線段');
刪除線段按鈕.addEventListener("click",刪除線段);
let 復原按鈕 = document.getElementById('復原');
復原按鈕.addEventListener('click',復原函數);
let 重做按鈕 = document.getElementById('重做');
重做按鈕.addEventListener('click',重做函數)
let 對齊舊點按鈕 = document.getElementById('自動對齊舊點');
對齊舊點按鈕.addEventListener('click',()=>{if(對齊模式){對齊模式 = false;對齊舊點按鈕.innerHTML="自動對齊:關" }else{對齊模式 = true;對齊舊點按鈕.innerHTML="自動對齊:開"}});
let 對齊整數或零點五按鈕 = document.getElementById('對齊整數或零點五');
對齊整數或零點五按鈕.addEventListener('click',整數小數模式切換);
let 顯示或關閉網格按鈕 = document.getElementById('顯示或關閉網格');
顯示或關閉網格按鈕.addEventListener('click',網格開關函數);
let 初始化按鈕 = document.getElementById('初始化');
初始化按鈕.addEventListener('click',開啟初始化對話框);
初始化按鈕.addEventListener("animationend", ()=>{按鈕.className = ""});
m.addEventListener("animationend", ()=>{m.className = "m待機狀態"});
let 尺寸 = document.getElementById('輸出尺寸');
尺寸.value="100";
尺寸.addEventListener("animationend", ()=>{尺寸.className = "";});
let 最終代碼顯示區域 = document.getElementById('最終代碼');
最終代碼顯示區域.innerHTML=代碼;
document.getElementById('比例尺').style.width = `${比例尺長度}px`;
let body = document.querySelector('body');
let 初始化確認視窗 = document.getElementById('初始化確認視窗');
初始化確認視窗.addEventListener("animationend", 隱藏視窗);
let 畫面變暗 = document.getElementById('畫面變暗');
畫面變暗.addEventListener("animationend", 隱藏視窗);
let 確認 = document.getElementById('確認');
確認.addEventListener('click',重置開始);
let 取消 = document.getElementById('取消');
取消.addEventListener('click',關閉對話框);
let 啟動中 = document.getElementById('啟動中');
let 歡迎畫面 = document.getElementById('歡迎畫面');
歡迎畫面.addEventListener("animationend", 隱藏視窗);
最終代碼顯示區域.addEventListener("animationend", 解除滾動鎖定);
let 頁面容器 = document.getElementById('頁面容器');
頁面容器.addEventListener("animationstart", ()=>{body.style.overflow = "hidden"});
頁面容器.addEventListener("animationend", ()=>{頁面容器.className = "";body.style.overflow = "scroll"});
最終代碼顯示區域.addEventListener("animationend", ()=>{最終代碼顯示區域.className = ""});

function 解除滾動鎖定(){
  if(移動端 == false){
    頁面容器.style.overflow='scroll';
  }
}



//滾輪狀態檢測

let 滾輪狀態;
window.addEventListener('wheel', 滾輪啟動);


function 滾輪啟動(e){
  滾輪狀態 = e.deltaY;
  
}

function 網格開關函數(){
  點擊在按鈕處 = true;
  if(網格開啟){
    網格開啟 = false;
  }
  else{
    網格開啟 = true;
  }
}

function 開啟初始化對話框(){
  點擊在按鈕處 = true;
  初始化確認視窗.style.display = "block";
  畫面變暗.style.display = "block";
  if(重置計數%3==0){
    初始化確認視窗.className = "動畫開啟";
  }
  else if(重置計數%3==1){
    初始化確認視窗.className = "動畫開啟2";
  }
  else{
    初始化確認視窗.className = "動畫開啟3";
  }
  畫面變暗.className = "背景變暗";
    
  
}

function 重置開始(){

  重置倒數 = 1;
  畫面變暗.className = "背景變亮";
  if(重置計數%3==0){
    頁面容器.className = "刷新";
    初始化確認視窗.className = "動畫關閉2";
  }
  else if(重置計數%3==1){
    頁面容器.className = "刷新2";
    初始化確認視窗.className = "動畫關閉4";
  }
  else{
    頁面容器.className = "刷新3";
    初始化確認視窗.className = "動畫關閉6";
    最終代碼顯示區域.className = "最終代碼伸縮消失";
    按鈕.className = '按鈕伸縮消失';
    m.className = 'm伸縮消失';
    尺寸.className = '尺寸伸縮消失';
  }
  重置計數++;
}

function 重置檢測(){
  if(重置倒數 > 0){
    重置倒數++;
    if(重置倒數 == 重置延遲){
      重置結束();
    }
  }
}

function 重置結束(){
  
  對齊舊點按鈕.innerHTML="自動對齊:關"
  對齊整數或零點五按鈕.innerHTML="貼齊整數/0.5"
  點擊在按鈕處 = false;
  尺寸.value="100";
  輸出尺寸=100;
  curves = [];
  lastCurves = [];
  lastCurves已使用 = false;
  被選取到的點 = [];
  整數模式 = true;
  對齊模式 = false;
  時光機 = [];
  時光機索引 = 0;
  網格開啟 = true;
  連擊間隔檢測 = 0;
  上次滑鼠位子x = 0;
  上次滑鼠位子y = 0;
  計時器 = 0;
  重置倒數 = 0;
  原點x = 輸出尺寸/2;
  原點y = 輸出尺寸/2;
  比例尺長度 = 輸出尺寸;
  document.getElementById('比例尺').style.width = `${比例尺長度}px`;
  代碼生成();

  if(原點x%1!==0){
    原點y = 原點x = (輸出尺寸+1)/2;
  }
}

function 關閉對話框(){
  if(重置計數%3==0){
    初始化確認視窗.className = "動畫關閉";
  }
  else if(重置計數%3==1){
    初始化確認視窗.className = "動畫關閉3";
  }
  else{
    初始化確認視窗.className = "動畫關閉5";
  }
  畫面變暗.className = "背景變亮";
}

function 隱藏視窗(){
  if(初始化確認視窗.className == "動畫關閉" || 初始化確認視窗.className == "動畫關閉2" || 初始化確認視窗.className == "動畫關閉3" || 初始化確認視窗.className == "動畫關閉4" || 初始化確認視窗.className == "動畫關閉5" || 初始化確認視窗.className == "動畫關閉6"){
    初始化確認視窗.style.display = "none";
  }
  if(畫面變暗.className == "背景變亮"){
    畫面變暗.style.display = "none";
  }
  歡迎畫面.style.display="none";
}


function 整數小數模式切換(){
  點擊在按鈕處 = true;
  if(整數模式 == true){
    if((輸出尺寸/2)%1!==0){
      原點y = 原點x = 輸出尺寸/2;
    }
    else{
      原點y = 原點x = (輸出尺寸+1)/2;
    }
    整數模式 = false;
    切換被選取的點的整數小數模式();
    對齊整數或零點五按鈕.innerHTML="貼齊:0.5"
  }
  else{
    if((輸出尺寸/2)%1!==0){
      原點y = 原點x = (輸出尺寸+1)/2;
    }
    else{
      原點y = 原點x = 輸出尺寸/2;
    }
    整數模式 = true;
    切換被選取的點的整數小數模式();
    對齊整數或零點五按鈕.innerHTML="貼齊:整數"
  }
  代碼生成();
}

function 切換被選取的點的整數小數模式(){
  let 有控制點被改變 = false;
  儲存當前狀態();
  if(整數模式 == true){
    for(let i=0;i<被選取到的點.length;i++){
      if(被選取到的點[i]%4==0){
        if(curves[Math.floor(被選取到的點[i]/4)].p1%1!==0){
          curves[Math.floor(被選取到的點[i]/4)].p1+=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p1>輸出尺寸){
            curves[Math.floor(被選取到的點[i]/4)].p1-=1;
          }
          有控制點被改變 = true;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p2%1!==0){
          curves[Math.floor(被選取到的點[i]/4)].p2+=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p2>輸出尺寸){
            curves[Math.floor(被選取到的點[i]/4)].p2-=1;
          }
          有控制點被改變 = true;
        }
      }
      if(被選取到的點[i]%4==1){
        if(curves[Math.floor(被選取到的點[i]/4)].p3%1!==0){
          curves[Math.floor(被選取到的點[i]/4)].p3+=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p3>輸出尺寸){
            curves[Math.floor(被選取到的點[i]/4)].p3-=1;
          }
          有控制點被改變 = true;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p4%1!==0){
          curves[Math.floor(被選取到的點[i]/4)].p4+=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p4>輸出尺寸){
            curves[Math.floor(被選取到的點[i]/4)].p4-=1;
          }
          有控制點被改變 = true;
        }
      }
      if(被選取到的點[i]%4==2){
        if(curves[Math.floor(被選取到的點[i]/4)].p5%1!==0){
          curves[Math.floor(被選取到的點[i]/4)].p5+=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p5>輸出尺寸){
            curves[Math.floor(被選取到的點[i]/4)].p5-=1;
          }
          有控制點被改變 = true;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p6%1!==0){
          curves[Math.floor(被選取到的點[i]/4)].p6+=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p6>輸出尺寸){
            curves[Math.floor(被選取到的點[i]/4)].p6-=1;
          }
          有控制點被改變 = true;
        }
      }
      if(被選取到的點[i]%4==3){
        if(curves[Math.floor(被選取到的點[i]/4)].p7%1!==0){
          curves[Math.floor(被選取到的點[i]/4)].p7+=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p7>輸出尺寸){
            curves[Math.floor(被選取到的點[i]/4)].p7-=1;
          }
          有控制點被改變 = true;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p8%1!==0){
          curves[Math.floor(被選取到的點[i]/4)].p8+=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p8>輸出尺寸){
            curves[Math.floor(被選取到的點[i]/4)].p8-=1;
          }
          有控制點被改變 = true;
        }
      }
    }
  }
  else{
    for(let i=0;i<被選取到的點.length;i++){
      if(被選取到的點[i]%4==0){
        if(curves[Math.floor(被選取到的點[i]/4)].p1%1==0){
          curves[Math.floor(被選取到的點[i]/4)].p1-=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p1<0){
            curves[Math.floor(被選取到的點[i]/4)].p1+=1;
          }
          有控制點被改變 = true;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p2%1==0){
          curves[Math.floor(被選取到的點[i]/4)].p2-=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p2<0){
            curves[Math.floor(被選取到的點[i]/4)].p2+=1;
          }
          有控制點被改變 = true;
        }
      }
      if(被選取到的點[i]%4==1){
        if(curves[Math.floor(被選取到的點[i]/4)].p3%1==0){
          curves[Math.floor(被選取到的點[i]/4)].p3-=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p3<0){
            curves[Math.floor(被選取到的點[i]/4)].p3+=1;
          }
          有控制點被改變 = true;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p4%1==0){
          curves[Math.floor(被選取到的點[i]/4)].p4-=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p4<0){
            curves[Math.floor(被選取到的點[i]/4)].p4+=1;
          }
          有控制點被改變 = true;
        }
      }
      if(被選取到的點[i]%4==2){
        if(curves[Math.floor(被選取到的點[i]/4)].p5%1==0){
          curves[Math.floor(被選取到的點[i]/4)].p5-=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p5<0){
            curves[Math.floor(被選取到的點[i]/4)].p5+=1;
          }
          有控制點被改變 = true;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p6%1==0){
          curves[Math.floor(被選取到的點[i]/4)].p6-=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p6<0){
            curves[Math.floor(被選取到的點[i]/4)].p6+=1;
          }
          有控制點被改變 = true;
        }
      }
      if(被選取到的點[i]%4==3){
        if(curves[Math.floor(被選取到的點[i]/4)].p7%1==0){
          curves[Math.floor(被選取到的點[i]/4)].p7-=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p7<0){
            curves[Math.floor(被選取到的點[i]/4)].p7+=1;
          }
          有控制點被改變 = true;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p8%1==0){
          curves[Math.floor(被選取到的點[i]/4)].p8-=0.5;
          if(curves[Math.floor(被選取到的點[i]/4)].p8<0){
            curves[Math.floor(被選取到的點[i]/4)].p8+=1;
          }
          有控制點被改變 = true;
        }
      }
    }
  }
  if(有控制點被改變 == true){
    for(let i=0;i<curves.length;i++){
      curves[i].oldp1 = curves[i].p1;
      curves[i].oldp2 = curves[i].p2;
      curves[i].oldp3 = curves[i].p3;
      curves[i].oldp4 = curves[i].p4;
      curves[i].oldp5 = curves[i].p5;
      curves[i].oldp6 = curves[i].p6;
      curves[i].oldp7 = curves[i].p7;
      curves[i].oldp8 = curves[i].p8;
    }
  }
}


function 對齊函數(){
  
  let newX = mouse.x;
  let newY = mouse.y;
  
  //let 對齊功能被觸發 = false;
  //let 對齊目標整數與否;
  for(let i=0, j=0;i<curves.length;i++){
    if(j<被選取到的點.length){
      if(被選取到的點[j]!==i*4){
        if(Math.sqrt(((mouse.x*輸出尺寸/height)-curves[i].p1)*((mouse.x*輸出尺寸/height)-curves[i].p1)+((mouse.y*輸出尺寸/height)-curves[i].p2)*((mouse.y*輸出尺寸/height)-curves[i].p2))<輸出尺寸/60){
          newX = curves[i].p1*height/輸出尺寸;
          newY = curves[i].p2*height/輸出尺寸;
          /*對齊功能被觸發 = true;
          if(curves[i].p1%1==0){
            對齊目標整數與否=true;
          }
          else{
            對齊目標整數與否=false;
          }*/
        }
      }
      else{
        j++;
      }
    }
    else{
      if(Math.sqrt(((mouse.x*輸出尺寸/height)-curves[i].p1)*((mouse.x*輸出尺寸/height)-curves[i].p1)+((mouse.y*輸出尺寸/height)-curves[i].p2)*((mouse.y*輸出尺寸/height)-curves[i].p2))<輸出尺寸/60){
        newX = curves[i].p1*height/輸出尺寸;
        newY = curves[i].p2*height/輸出尺寸;
        /*對齊功能被觸發 = true;
        if(curves[i].p1%1==0){
          對齊目標整數與否=true;
        }
        else{
          對齊目標整數與否=false;
        }*/
      }
    }

    if(j<被選取到的點.length){
      if(被選取到的點[j]!==i*4+1){
        if(Math.sqrt(((mouse.x*輸出尺寸/height)-curves[i].p3)*((mouse.x*輸出尺寸/height)-curves[i].p3)+((mouse.y*輸出尺寸/height)-curves[i].p4)*((mouse.y*輸出尺寸/height)-curves[i].p4))<輸出尺寸/60){
          newX = curves[i].p3*height/輸出尺寸;
          newY = curves[i].p4*height/輸出尺寸;
          /*對齊功能被觸發 = true;
          if(curves[i].p3%1==0){
            對齊目標整數與否=true;
          }
          else{
            對齊目標整數與否=false;
          }*/
        }
      }
      else{
        j++;
      }
    }
    else{
      if(Math.sqrt(((mouse.x*輸出尺寸/height)-curves[i].p3)*((mouse.x*輸出尺寸/height)-curves[i].p3)+((mouse.y*輸出尺寸/height)-curves[i].p4)*((mouse.y*輸出尺寸/height)-curves[i].p4))<輸出尺寸/60){
        newX = curves[i].p3*height/輸出尺寸;
        newY = curves[i].p4*height/輸出尺寸;
        /*對齊功能被觸發 = true;
        if(curves[i].p3%1==0){
          對齊目標整數與否=true;
        }
        else{
          對齊目標整數與否=false;
        }*/
      }
    }

    if(j<被選取到的點.length){
      if(被選取到的點[j]!==i*4+3){
        if(Math.sqrt(((mouse.x*輸出尺寸/height)-curves[i].p7)*((mouse.x*輸出尺寸/height)-curves[i].p7)+((mouse.y*輸出尺寸/height)-curves[i].p8)*((mouse.y*輸出尺寸/height)-curves[i].p8))<輸出尺寸/60){
          newX = curves[i].p7*height/輸出尺寸;
          newY = curves[i].p8*height/輸出尺寸;
          /*對齊功能被觸發 = true;
          if(curves[i].p7%1==0){
            對齊目標整數與否=true;
          }
          else{
            對齊目標整數與否=false;
          }*/
        }
      }
      else{
        j++;
      }
    }
    else{
      if(Math.sqrt(((mouse.x*輸出尺寸/height)-curves[i].p7)*((mouse.x*輸出尺寸/height)-curves[i].p7)+((mouse.y*輸出尺寸/height)-curves[i].p8)*((mouse.y*輸出尺寸/height)-curves[i].p8))<輸出尺寸/60){
        newX = curves[i].p7*height/輸出尺寸;
        newY = curves[i].p8*height/輸出尺寸;
        /*對齊功能被觸發 = true;
        if(curves[i].p7%1==0){
          對齊目標整數與否=true;
        }
        else{
          對齊目標整數與否=false;
        }*/
      }
    }

    if(j<被選取到的點.length){
      if(被選取到的點[j]!==i*4+2){
        if(Math.sqrt(((mouse.x*輸出尺寸/height)-curves[i].p5)*((mouse.x*輸出尺寸/height)-curves[i].p5)+((mouse.y*輸出尺寸/height)-curves[i].p6)*((mouse.y*輸出尺寸/height)-curves[i].p6))<輸出尺寸/60){
          newX = curves[i].p5*height/輸出尺寸;
          newY = curves[i].p6*height/輸出尺寸;
          /*對齊功能被觸發 = true;
          if(curves[i].p5%1==0){
            對齊目標整數與否=true;
          }
          else{
            對齊目標整數與否=false;
          }*/
        }
      }
      else{
        j++;
      }
    }
    else{
      if(Math.sqrt(((mouse.x*輸出尺寸/height)-curves[i].p5)*((mouse.x*輸出尺寸/height)-curves[i].p5)+((mouse.y*輸出尺寸/height)-curves[i].p6)*((mouse.y*輸出尺寸/height)-curves[i].p6))<輸出尺寸/60){
        newX = curves[i].p5*height/輸出尺寸;
        newY = curves[i].p6*height/輸出尺寸;
        /*對齊功能被觸發 = true;
        if(curves[i].p5%1==0){
          對齊目標整數與否=true;
        }
        else{
          對齊目標整數與否=false;
        }*/
      }
    }
  }

  mouse.x = newX;
  mouse.y = newY;
  
  //mouse.x = Math.round(newX*2)/2;
  //mouse.y = Math.round(newY*2)/2;

  /*if(整數模式 == false && 對齊功能被觸發 == true){
    if(對齊目標整數與否==true){
      //mouse.x += 0.5;
      //mouse.y += 0.5;
    }
  }
  if(整數模式 == true && 對齊功能被觸發 == true){
    if(對齊目標整數與否==false){
      //mouse.x -= 0.5;
      //mouse.y -= 0.5;
    }
  }*/
}


//新曲線構造器

function Curve(p1, p2, p3, p4, p5, p6, p7, p8) {
  this.p1 = p1;
  this.p2 = p2; 
  this.p3 = p3;
  this.p4 = p4;
  this.p5 = p5;
  this.p6 = p6;
  this.p7 = p7;
  this.p8 = p8;
  this.oldp1 = p1;
  this.oldp2 = p2;
  this.oldp3 = p3;
  this.oldp4 = p4;
  this.oldp5 = p5;
  this.oldp6 = p6;
  this.oldp7 = p7;
  this.oldp8 = p8;
  this.待刪 = false;
  this.is_straight = false;
}

function 更新輸出尺寸(){
  
  輸出尺寸 = parseInt(尺寸.value);
  if(parseInt(尺寸.value)<5||尺寸.value==''){
    輸出尺寸=5;
    }
    if(parseInt(尺寸.value)>32768){
      輸出尺寸=32768;
    }



  原點x = 輸出尺寸/2;
  原點y = 輸出尺寸/2;


  if(原點x%1!==0){
    原點y = 原點x = (輸出尺寸+1)/2;
  }

  比例尺長度 = 輸出尺寸;
  document.getElementById('比例尺').style.width = `${比例尺長度}px`;
}

function 按下鍵盤(e){
  更新延遲=計時器;
  檢測鍵盤按鍵(e);
}

function 檢測鍵盤按鍵(e){
  if(e.code=='KeyN'&&keyN已被按下 == false){
    createNewCurve();
    keyN已被按下 = true;
  }
}

function 鬆開鍵盤(){
  代碼生成();
  if(焦點==尺寸){
    更新輸出尺寸();
  }
  keyN已被按下 = false;
}

function 滑鼠放開(){
  if(矩形選取模式 == true){
    矩形選取();
    矩形選取模式 = false;
  }
  


  if(mouse.按下滑鼠時在界內 == false){
    return;
  }
  if(移動發生==true){
    for(let i=0;i<curves.length;i++){
      curves[i].oldp1 = curves[i].p1;
      curves[i].oldp2 = curves[i].p2;
      curves[i].oldp3 = curves[i].p3;
      curves[i].oldp4 = curves[i].p4;
      curves[i].oldp5 = curves[i].p5;
      curves[i].oldp6 = curves[i].p6;
      curves[i].oldp7 = curves[i].p7;
      curves[i].oldp8 = curves[i].p8;
    }
    移動發生=false;
  }

  滑鼠按著 = false;
}


 //檢查點擊到哪個控制點
function 按下滑鼠(){


  if(mouse.界內 == false){
    mouse.按下滑鼠時在界內 = false;
    return;
  }
  mouse.按下滑鼠時在界內 = true;

  //檢查點擊到哪個控制點
  

  
    
  移動前原始座標x = mouse.x;
  移動前原始座標y = mouse.y;
  未修正移動前原始座標x = mouse.未修正x;
  未修正移動前原始座標y = mouse.未修正y;
  
  
  


  if(被選取到的點.length <= 1){

    被選取到的點 = [];

  }

  else{

    let 是否有點到已選點 = false;
    for(let i=0;i<被選取到的點.length;i++){
      if(被選取到的點[i]%4 == 0){
        if(Math.sqrt((curves[Math.floor(被選取到的點[i]/4)].p1*height/輸出尺寸-mouse.未修正x)*(curves[Math.floor(被選取到的點[i]/4)].p1*height/輸出尺寸-mouse.未修正x)+(curves[Math.floor(被選取到的點[i]/4)].p2*height/輸出尺寸-mouse.未修正y)*(curves[Math.floor(被選取到的點[i]/4)].p2*height/輸出尺寸-mouse.未修正y))<路徑頭尾圓點半徑){
          是否有點到已選點 = true;
          抓著的點 = 被選取到的點[i];
        }
      }
      if(被選取到的點[i]%4 == 1){
        if(Math.sqrt((curves[Math.floor(被選取到的點[i]/4)].p3*height/輸出尺寸-mouse.未修正x)*(curves[Math.floor(被選取到的點[i]/4)].p3*height/輸出尺寸-mouse.未修正x)+(curves[Math.floor(被選取到的點[i]/4)].p4*height/輸出尺寸-mouse.未修正y)*(curves[Math.floor(被選取到的點[i]/4)].p4*height/輸出尺寸-mouse.未修正y))<貝茲控制點圓點半徑){
          是否有點到已選點 = true;
          抓著的點 = 被選取到的點[i];
        }
      }
      if(被選取到的點[i]%4 == 3){
        if(Math.sqrt((curves[Math.floor(被選取到的點[i]/4)].p7*height/輸出尺寸-mouse.未修正x)*(curves[Math.floor(被選取到的點[i]/4)].p7*height/輸出尺寸-mouse.未修正x)+(curves[Math.floor(被選取到的點[i]/4)].p8*height/輸出尺寸-mouse.未修正y)*(curves[Math.floor(被選取到的點[i]/4)].p8*height/輸出尺寸-mouse.未修正y))<路徑頭尾圓點半徑){
          是否有點到已選點 = true;
          抓著的點 = 被選取到的點[i];
        }
      }
      if(被選取到的點[i]%4 == 2){
        if(Math.sqrt((curves[Math.floor(被選取到的點[i]/4)].p5*height/輸出尺寸-mouse.未修正x)*(curves[Math.floor(被選取到的點[i]/4)].p5*height/輸出尺寸-mouse.未修正x)+(curves[Math.floor(被選取到的點[i]/4)].p6*height/輸出尺寸-mouse.未修正y)*(curves[Math.floor(被選取到的點[i]/4)].p6*height/輸出尺寸-mouse.未修正y))<貝茲控制點圓點半徑){
          是否有點到已選點 = true;
          抓著的點 = 被選取到的點[i];
        }
      }
    }

    if(是否有點到已選點 == false){
      被選取到的點 = [];
    }
  }

  //在符合條件的情況，開始判斷單點選取

  if(被選取到的點.length == 0){
    for(let i=0; i<curves.length; i++){
      if(Math.sqrt((curves[i].p1*height/輸出尺寸-mouse.未修正x)*(curves[i].p1*height/輸出尺寸-mouse.未修正x)+(curves[i].p2*height/輸出尺寸-mouse.未修正y)*(curves[i].p2*height/輸出尺寸-mouse.未修正y))<路徑頭尾圓點半徑){
        抓著的點 = 被選取到的點 = [i*4];
      }
      if(Math.sqrt((curves[i].p3*height/輸出尺寸-mouse.未修正x)*(curves[i].p3*height/輸出尺寸-mouse.未修正x)+(curves[i].p4*height/輸出尺寸-mouse.未修正y)*(curves[i].p4*height/輸出尺寸-mouse.未修正y))<貝茲控制點圓點半徑){
        抓著的點 = 被選取到的點 = [i*4+1];
      }
      if(Math.sqrt((curves[i].p7*height/輸出尺寸-mouse.未修正x)*(curves[i].p7*height/輸出尺寸-mouse.未修正x)+(curves[i].p8*height/輸出尺寸-mouse.未修正y)*(curves[i].p8*height/輸出尺寸-mouse.未修正y))<路徑頭尾圓點半徑){
        抓著的點 = 被選取到的點 = [i*4+3];
      }
      if(Math.sqrt((curves[i].p5*height/輸出尺寸-mouse.未修正x)*(curves[i].p5*height/輸出尺寸-mouse.未修正x)+(curves[i].p6*height/輸出尺寸-mouse.未修正y)*(curves[i].p6*height/輸出尺寸-mouse.未修正y))<貝茲控制點圓點半徑){
        抓著的點 = 被選取到的點 = [i*4+2];
      }
    }

    if(上次滑鼠位子x == mouse.x && 上次滑鼠位子y == mouse.y && 計時器 - 連擊間隔檢測 < 30 && 被選取到的點.length == 1){
      被選取到的點.push(Math.floor(被選取到的點[0]/4)*4);
      被選取到的點.push(Math.floor(被選取到的點[0]/4)*4+1);
      被選取到的點.push(Math.floor(被選取到的點[0]/4)*4+3);
      被選取到的點.push(Math.floor(被選取到的點[0]/4)*4+2);
      被選取到的點.shift();
    }
  }

  //如果沒有點擊到控制點，則實作拖曳選取模式

  if(被選取到的點.length == 0){
    矩形選取模式 = true;

  }
  else{
    移動發生 = true;
    儲存當前狀態();
    點擊誤差();
  }

  
  滑鼠按著 = true;

  

  上次滑鼠位子x = mouse.x;
  上次滑鼠位子y = mouse.y;
  連擊間隔檢測 = 計時器;

}

function 滑鼠對齊輸出尺寸(){
  
  let 單位距離 = height/輸出尺寸;
  let 最近點 = 0;
  if(整數模式==false){
    最近點-=單位距離/2;
  }
  while(最近點 < mouse.x){
    最近點 += 單位距離;
  }
  if(最近點 - mouse.x > mouse.x + 單位距離 - 最近點){
    mouse.x = 最近點 - 單位距離;
  }
  else{
    mouse.x = 最近點;
  }

  最近點 = 0;
  if(整數模式==false){
    最近點-=單位距離/2;
  }

  while(最近點 < mouse.y){
    最近點 += 單位距離;
  }
  if(最近點 - mouse.y > mouse.y + 單位距離 - 最近點){
    mouse.y = 最近點 - 單位距離;
  }
  else{
    mouse.y = 最近點;
  }

  
}

function 矩形選取(){

  if(未修正移動前原始座標x<mouse.未修正x){
    矩形左上x=未修正移動前原始座標x-1;
    矩形右下x=mouse.未修正x+1;
  }
  else{
    矩形左上x=mouse.未修正x-1;
    矩形右下x=未修正移動前原始座標x+1;
  }
  if(未修正移動前原始座標y<mouse.未修正y){
    矩形左上y=未修正移動前原始座標y-1;
    矩形右下y=mouse.未修正y+1;
  }
  else{
    矩形左上y=mouse.未修正y-1;
    矩形右下y=未修正移動前原始座標y+1;
  }


  for(let i=0;i<curves.length;i++){
    
    if(curves[i].p1*height/輸出尺寸 > 矩形左上x && curves[i].p1*height/輸出尺寸 < 矩形右下x && curves[i].p2*height/輸出尺寸 > 矩形左上y && curves[i].p2*height/輸出尺寸 < 矩形右下y){
      被選取到的點.push(i*4);
    }
    if(curves[i].p3*height/輸出尺寸 > 矩形左上x && curves[i].p3*height/輸出尺寸 < 矩形右下x && curves[i].p4*height/輸出尺寸 > 矩形左上y && curves[i].p4*height/輸出尺寸 < 矩形右下y){
      被選取到的點.push(i*4+1);
    }
    if(curves[i].p7*height/輸出尺寸 > 矩形左上x && curves[i].p7*height/輸出尺寸 < 矩形右下x && curves[i].p8*height/輸出尺寸 > 矩形左上y && curves[i].p8*height/輸出尺寸 < 矩形右下y){
      被選取到的點.push(i*4+3);
    }
    if(curves[i].p5*height/輸出尺寸 > 矩形左上x && curves[i].p5*height/輸出尺寸 < 矩形右下x && curves[i].p6*height/輸出尺寸 > 矩形左上y && curves[i].p6*height/輸出尺寸 < 矩形右下y){
      被選取到的點.push(i*4+2);
    }
  }
}

//建構curves數組

function createNewCurve() {

  點擊在按鈕處 = true;
  儲存當前狀態();
  
  let 目標插入點;
  let p1,p2,p3,p4,p5,p6,p7,p8;
  if(被選取到的點.length === 0){
    目標插入點 = curves.length;
  }
  else{
    目標插入點 = Math.floor((Math.max(...被選取到的點)-2)/4)+1;
    //alert(`${目標插入點}`);
  }

  let x軸方向;
  let y軸方向;

  let 橫向距離;
  let 縱向距離;

  橫向距離 = Math.round(輸出尺寸/10);
  縱向距離 = Math.round(輸出尺寸/10);

  if (目標插入點 == 0){
    if(curves.length === 0){
      p1 = 原點x;
      p2 = 原點y;
      p3 = 原點x;
      p4 = 原點y+橫向距離;
      p5 = 原點x+縱向距離;
      p6 = 原點y+橫向距離;
      p7 = 原點x+縱向距離;
      p8 = 原點y;
    }
    else{
      if(curves[0].p1<原點x){
        x軸方向 = 1;
      }
      else{
        x軸方向 = -1;
      }
      if(curves[0].p2<原點y){
        y軸方向 = 1;
      }
      else{
        y軸方向 = -1;
      }
      p1=curves[0].p1+(縱向距離*x軸方向);
      p2=curves[0].p2;
      p3=curves[0].p1+(縱向距離*x軸方向);
      p4=curves[0].p2+(橫向距離*y軸方向);
      p5=curves[0].p1;
      p6=curves[0].p2+(橫向距離*y軸方向);
      p7=curves[0].p1;
      p8=curves[0].p2;

      for(let i = 0; i < 被選取到的點.length; i++){
        被選取到的點[i] += 4;
      }

    }
  }
  else if(目標插入點 == curves.length){
    if(curves[curves.length-1].p7<原點x){
      x軸方向 = 1;
    }
    else{
      x軸方向 = -1;
    }
    if(curves[curves.length-1].p8<原點y){
      y軸方向 = 1;
    }
    else{
      y軸方向 = -1;
    }
    p1=curves[curves.length-1].p7;
    p2=curves[curves.length-1].p8;
    p3=curves[curves.length-1].p7;
    p4=curves[curves.length-1].p8+(橫向距離*y軸方向);
    p5=curves[curves.length-1].p7+(縱向距離*x軸方向);
    p6=curves[curves.length-1].p8+(橫向距離*y軸方向);
    p7=curves[curves.length-1].p7+(縱向距離*x軸方向);
    p8=curves[curves.length-1].p8;
  }
  else{
    let 終點y軸方向;
    if(curves[目標插入點-1].p8<原點y){
      y軸方向 = 1;
    }
    else{
      y軸方向 = -1;
    }
    if(curves[目標插入點].p2<原點y){
      終點y軸方向 = 1;
    }
    else{
      終點y軸方向 = -1;
    }
    p1=curves[目標插入點-1].p7;
    p2=curves[目標插入點-1].p8;
    p3=curves[目標插入點-1].p7;
    p4=curves[目標插入點-1].p8+(橫向距離*y軸方向);
    p5=curves[目標插入點].p1;
    p6=curves[目標插入點].p2+(橫向距離*終點y軸方向);
    p7=curves[目標插入點].p1;
    p8=curves[目標插入點].p2;

    for(let i = 0; i < 被選取到的點.length; i++){
      被選取到的點[i] += 4;
    }
  }
  //alert(`${p1},${p2},${p3},${p4},${p5},${p6},${p7},${p8},${curves.length},${目標插入點}`);
  let curve = new Curve(p1,p2,p3,p4,p5,p6,p7,p8);
  //curves.push(curve);
  curves.splice(目標插入點 , 0 , curve);

  代碼生成();
  
}

function 刪除線段(){

  點擊在按鈕處 = true;
  if(被選取到的點.length>0){
    儲存當前狀態();
  }
  for(let i = 0; i < 被選取到的點.length; i++){
    curves[Math.floor(被選取到的點[i]/4)].待刪 = true;
  }

  let 完整遍歷 = false;
  let 本次是否完整 = true;
  let 上次斷點 = 0;

  while(完整遍歷 == false){
    本次是否完整 = true;
    for(let i = 上次斷點; i < curves.length; i++){
      if(curves[i].待刪 == true){
        curves.splice(i,1);
        上次斷點 = i;
        本次是否完整 = false;
        break;
      }
    }
    if(本次是否完整){
      完整遍歷 = true;
    }
  }
  被選取到的點 = [];
  代碼生成();
}

//繪製曲線

Curve.prototype.drawCurve = function(){
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.strokeStyle = "hsla(0,100%,0%,1)"
  ctx.moveTo(this.p1*height/輸出尺寸, this.p2*height/輸出尺寸);
  ctx.bezierCurveTo(this.p3*height/輸出尺寸, this.p4*height/輸出尺寸, this.p5*height/輸出尺寸, this.p6*height/輸出尺寸, this.p7*height/輸出尺寸, this.p8*height/輸出尺寸);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(this.p1*height/輸出尺寸, this.p2*height/輸出尺寸, 路徑頭尾圓點半徑, 0, 2 * Math.PI);
  ctx.arc(this.p7*height/輸出尺寸, this.p8*height/輸出尺寸, 路徑頭尾圓點半徑, 0, 2 * Math.PI);
  ctx.fillStyle = "hsla(45,100%,50%,1)"
  ctx.fill();


  ctx.beginPath();
  ctx.arc(this.p3*height/輸出尺寸, this.p4*height/輸出尺寸, 貝茲控制點圓點半徑, 0, 2 * Math.PI);
  ctx.arc(this.p5*height/輸出尺寸, this.p6*height/輸出尺寸, 貝茲控制點圓點半徑, 0, 2 * Math.PI);
  ctx.fillStyle = "hsla(30,100%,50%,1)"
  ctx.fill();


  ctx.lineWidth = 0.3;
  ctx.beginPath();
  ctx.strokeStyle = "hsla(30,100%,0%,1)"
  ctx.moveTo(this.p1*height/輸出尺寸, this.p2*height/輸出尺寸);
  ctx.lineTo(this.p3*height/輸出尺寸, this.p4*height/輸出尺寸);
  ctx.moveTo(this.p7*height/輸出尺寸, this.p8*height/輸出尺寸);
  ctx.lineTo(this.p5*height/輸出尺寸, this.p6*height/輸出尺寸);
  ctx.stroke();
}

Curve.prototype.draw虛線 = function(i){
  ctx.beginPath();
  ctx.lineWidth = 0.2;
  ctx.strokeStyle = "hsla(0,100%,0%,1)"
  ctx.setLineDash([1,2]);
  ctx.moveTo(this.p7*height/輸出尺寸, this.p8*height/輸出尺寸);
  ctx.lineTo(curves[i+1].p1*height/輸出尺寸, curves[i+1].p2*height/輸出尺寸);
  ctx.stroke();
  ctx.setLineDash([]);
}

function 點擊誤差(){
  //實作吸附到滑鼠中心
  //目的是為了實現對齊功能的必要前置
  
  if(抓著的點%4==0){
    點擊誤差x=Math.round((curves[Math.floor(抓著的點/4)].p1-mouse.未修正x*輸出尺寸/height)*2)/2;
    點擊誤差y=Math.round((curves[Math.floor(抓著的點/4)].p2-mouse.未修正y*輸出尺寸/height)*2)/2;
  }
  if(抓著的點%4==1){
    點擊誤差x=Math.round((curves[Math.floor(抓著的點/4)].p3-mouse.未修正x*輸出尺寸/height)*2)/2;
    點擊誤差y=Math.round((curves[Math.floor(抓著的點/4)].p4-mouse.未修正y*輸出尺寸/height)*2)/2;
  }
  if(抓著的點%4==2){
    點擊誤差x=Math.round((curves[Math.floor(抓著的點/4)].p5-mouse.未修正x*輸出尺寸/height)*2)/2;
    點擊誤差y=Math.round((curves[Math.floor(抓著的點/4)].p6-mouse.未修正y*輸出尺寸/height)*2)/2;
  }
  if(抓著的點%4==3){
    點擊誤差x=Math.round((curves[Math.floor(抓著的點/4)].p7-mouse.未修正x*輸出尺寸/height)*2)/2;
    點擊誤差y=Math.round((curves[Math.floor(抓著的點/4)].p8-mouse.未修正y*輸出尺寸/height)*2)/2;
  }
  
  if(點擊誤差x%1!==0){
    點擊誤差x+=0.5;
  }
  if(點擊誤差y%1!==0){
    點擊誤差y+=0.5;
  }
  
  
}

function 拖曳選點(){

  

  if(滑鼠按著 == true && 矩形選取模式 == false){


    for(let i=0;i<被選取到的點.length;i++){
      if(被選取到的點[i]%4==0){
        curves[Math.floor(被選取到的點[i]/4)].p1 = curves[Math.floor(被選取到的點[i]/4)].oldp1 + (mouse.x-移動前原始座標x)*輸出尺寸/height - 點擊誤差x;
        curves[Math.floor(被選取到的點[i]/4)].p2 = curves[Math.floor(被選取到的點[i]/4)].oldp2 + (mouse.y-移動前原始座標y)*輸出尺寸/height - 點擊誤差y;
        if(curves[Math.floor(被選取到的點[i]/4)].p1 < 0){
          curves[Math.floor(被選取到的點[i]/4)].p1 = 0;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p1 > 輸出尺寸){
          curves[Math.floor(被選取到的點[i]/4)].p1 = 輸出尺寸;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p2 < 0){
          curves[Math.floor(被選取到的點[i]/4)].p2 = 0;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p2 > 輸出尺寸){
          curves[Math.floor(被選取到的點[i]/4)].p2 = 輸出尺寸;
        }
        curves[Math.floor(被選取到的點[i]/4)].p1=(Math.round(curves[Math.floor(被選取到的點[i]/4)].p1*2))/2;
        curves[Math.floor(被選取到的點[i]/4)].p2=(Math.round(curves[Math.floor(被選取到的點[i]/4)].p2*2))/2;
      }
      if(被選取到的點[i]%4==1){
        curves[Math.floor(被選取到的點[i]/4)].p3 = curves[Math.floor(被選取到的點[i]/4)].oldp3 + (mouse.x-移動前原始座標x)*輸出尺寸/height - 點擊誤差x;
        curves[Math.floor(被選取到的點[i]/4)].p4 = curves[Math.floor(被選取到的點[i]/4)].oldp4 + (mouse.y-移動前原始座標y)*輸出尺寸/height - 點擊誤差y;
        if(curves[Math.floor(被選取到的點[i]/4)].p3 < 0){
          curves[Math.floor(被選取到的點[i]/4)].p3 = 0;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p3 > 輸出尺寸){
          curves[Math.floor(被選取到的點[i]/4)].p3 = 輸出尺寸;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p4 < 0){
          curves[Math.floor(被選取到的點[i]/4)].p4 = 0;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p4 > 輸出尺寸){
          curves[Math.floor(被選取到的點[i]/4)].p4 = 輸出尺寸;
        }
        curves[Math.floor(被選取到的點[i]/4)].p3=(Math.round(curves[Math.floor(被選取到的點[i]/4)].p3*2))/2;
        curves[Math.floor(被選取到的點[i]/4)].p4=(Math.round(curves[Math.floor(被選取到的點[i]/4)].p4*2))/2;
      }

      if(被選取到的點[i]%4==2){
        curves[Math.floor(被選取到的點[i]/4)].p5 = curves[Math.floor(被選取到的點[i]/4)].oldp5 + (mouse.x-移動前原始座標x)*輸出尺寸/height - 點擊誤差x;
        curves[Math.floor(被選取到的點[i]/4)].p6 = curves[Math.floor(被選取到的點[i]/4)].oldp6 + (mouse.y-移動前原始座標y)*輸出尺寸/height - 點擊誤差y;
        if(curves[Math.floor(被選取到的點[i]/4)].p5 < 0){
          curves[Math.floor(被選取到的點[i]/4)].p5 = 0;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p5 > 輸出尺寸){
          curves[Math.floor(被選取到的點[i]/4)].p5 = 輸出尺寸;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p6 < 0){
          curves[Math.floor(被選取到的點[i]/4)].p6 = 0;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p6 > 輸出尺寸){
          curves[Math.floor(被選取到的點[i]/4)].p6 = 輸出尺寸;
        }
        curves[Math.floor(被選取到的點[i]/4)].p5=(Math.round(curves[Math.floor(被選取到的點[i]/4)].p5*2))/2;
        curves[Math.floor(被選取到的點[i]/4)].p6=(Math.round(curves[Math.floor(被選取到的點[i]/4)].p6*2))/2;
      }
      if(被選取到的點[i]%4==3){
        curves[Math.floor(被選取到的點[i]/4)].p7 = curves[Math.floor(被選取到的點[i]/4)].oldp7 + (mouse.x-移動前原始座標x)*輸出尺寸/height - 點擊誤差x;
        curves[Math.floor(被選取到的點[i]/4)].p8 = curves[Math.floor(被選取到的點[i]/4)].oldp8 + (mouse.y-移動前原始座標y)*輸出尺寸/height - 點擊誤差y;
        if(curves[Math.floor(被選取到的點[i]/4)].p7 < 0){
          curves[Math.floor(被選取到的點[i]/4)].p7 = 0;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p7 > 輸出尺寸){
          curves[Math.floor(被選取到的點[i]/4)].p7 = 輸出尺寸;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p8 < 0){
          curves[Math.floor(被選取到的點[i]/4)].p8 = 0;
        }
        if(curves[Math.floor(被選取到的點[i]/4)].p8 > 輸出尺寸){
          curves[Math.floor(被選取到的點[i]/4)].p8 = 輸出尺寸;
        }
        curves[Math.floor(被選取到的點[i]/4)].p7=(Math.round(curves[Math.floor(被選取到的點[i]/4)].p7*2))/2;
        curves[Math.floor(被選取到的點[i]/4)].p8=(Math.round(curves[Math.floor(被選取到的點[i]/4)].p8*2))/2;
      }
    }
  }
}

function 儲存當前狀態(){

  代碼生成();

  let oldCurves = [];
  for(let i=0;i<curves.length;i++){
    let curve = new Curve(curves[i].p1,curves[i].p2,curves[i].p3,curves[i].p4,curves[i].p5,curves[i].p6,curves[i].p7,curves[i].p8);
    oldCurves.push(curve);
  }
  if(時光機索引==時光機.length){
    時光機.push(oldCurves);
  }
  else{
    lastCurves已使用 = false;
  }
  if(時光機索引+1<時光機.length){
    時光機.splice(時光機索引+1);
  }
  時光機索引++;
}

function 從時光機提取狀態(){
  //curves = 時光機[時光機索引];
  curves = [];
  for(let i=0;i<時光機[時光機索引].length;i++){
    let curve = new Curve(時光機[時光機索引][i].p1,時光機[時光機索引][i].p2,時光機[時光機索引][i].p3,時光機[時光機索引][i].p4,時光機[時光機索引][i].p5,時光機[時光機索引][i].p6,時光機[時光機索引][i].p7,時光機[時光機索引][i].p8);
    curves.push(curve);
  }
}

function 復原函數(){
  點擊在按鈕處 = true;
  if(時光機.length>0&&lastCurves已使用 == false){
    記錄最後一步();
  }
  if(時光機索引>0){
    時光機索引--;
    從時光機提取狀態();
    //不取消此陣列會出bug
  被選取到的點=[];
  }
}

function 重做函數(){

  點擊在按鈕處 = true;
  被選取到的點=[];
  if(時光機索引+1<時光機.length){
    時光機索引++;
    從時光機提取狀態();
  }
  else if(lastCurves已使用 == true){
    curves = [];
    for(let i=0;i<lastCurves.length;i++){
      let curve = new Curve(lastCurves[i].p1,lastCurves[i].p2,lastCurves[i].p3,lastCurves[i].p4,lastCurves[i].p5,lastCurves[i].p6,lastCurves[i].p7,lastCurves[i].p8);
      curves.push(curve);
    }
    lastCurves = [];
    lastCurves已使用 = false;
    時光機索引++;
  }
}

function 記錄最後一步(){
  lastCurves = [];
  for(let i=0;i<curves.length;i++){
    let curve = new Curve(curves[i].p1,curves[i].p2,curves[i].p3,curves[i].p4,curves[i].p5,curves[i].p6,curves[i].p7,curves[i].p8);
    lastCurves.push(curve);
  }
  lastCurves已使用 = true;
}


function 繪製背景(){
  ctx.fillStyle = `hsla(60,100%,70%,1)`;
  ctx.fillRect(0,0,width,height);
}

function 繪製曲線(){
  for(let i=0; i<curves.length; i++){
    curves[i].drawCurve();
    if(i+1<curves.length){
      curves[i].draw虛線(i);
    }
  }
}

function 繪製被選標記(){
  for(let i=0; i<被選取到的點.length; i++){

    ctx.strokeStyle = "hsla(340,100%,0%,0.8)"

    if(被選取到的點[i]%4==0){
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(curves[Math.floor(被選取到的點[i]/4)].p1*height/輸出尺寸, curves[Math.floor(被選取到的點[i]/4)].p2*height/輸出尺寸, 路徑頭尾圓點半徑, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if(被選取到的點[i]%4==1){
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(curves[Math.floor(被選取到的點[i]/4)].p3*height/輸出尺寸, curves[Math.floor(被選取到的點[i]/4)].p4*height/輸出尺寸, 貝茲控制點圓點半徑, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if(被選取到的點[i]%4==2){
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(curves[Math.floor(被選取到的點[i]/4)].p5*height/輸出尺寸, curves[Math.floor(被選取到的點[i]/4)].p6*height/輸出尺寸, 貝茲控制點圓點半徑, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if(被選取到的點[i]%4==3){
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(curves[Math.floor(被選取到的點[i]/4)].p7*height/輸出尺寸, curves[Math.floor(被選取到的點[i]/4)].p8*height/輸出尺寸, 路徑頭尾圓點半徑, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
}

function 繪製矩形選取區(){
  ctx.setLineDash([3,5]);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "hsla(0,0%,0%,1)";
  ctx.strokeRect(未修正移動前原始座標x, 未修正移動前原始座標y, mouse.未修正x-未修正移動前原始座標x, mouse.未修正y-未修正移動前原始座標y);
  ctx.setLineDash([]);
}


function 繪製網格(){
  let 單位距離=height/輸出尺寸;
  let 網格透明度=1;
  if(輸出尺寸>0){
    網格透明度/=Math.sqrt(輸出尺寸);
  }
  for(let i=1;i<輸出尺寸;i++){
    
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.moveTo(i*單位距離, 0);
    ctx.lineTo(i*單位距離, height);
    ctx.strokeStyle = `hsla(0,0%,0%,${網格透明度})`;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i*單位距離);
    ctx.lineTo(height, i*單位距離);
    ctx.strokeStyle = `hsla(0,0%,0%,${網格透明度})`;
    ctx.stroke();

  }
}

function 尺寸最大值(){
  if(parseInt(尺寸.value)>32768){
    尺寸.value='32768';
  }
}

let canvas代稱 = 'ctx'; 

function 代碼生成(){
  代碼="";
  if(curves.length>0){
    代碼=""
    代碼+=`${canvas代稱}.beginPath();<br/>`
    
    for(let i=0;i<curves.length;i++){
      if(i==0){
        代碼+=`${canvas代稱}.moveTo(${curves[i].p1},${curves[i].p2});<br/>`
      }
      else{
        if(curves[i].p1==curves[i-1].p7&&curves[i].p2==curves[i-1].p8){}
        else{
          代碼+=`${canvas代稱}.moveTo(${curves[i].p1},${curves[i].p2});<br/>`
        }
      }
      if(curves[i].p1==curves[i].p3&&curves[i].p2==curves[i].p4&&curves[i].p5==curves[i].p7&&curves[i].p6==curves[i].p8){
        代碼+=`${canvas代稱}.lineTo(${curves[i].p7},${curves[i].p8});<br/>`
      }
      else if(curves[i].p1==curves[i].p3&&curves[i].p2==curves[i].p4){
        代碼+=`${canvas代稱}.quadraticCurveTo(${curves[i].p5},${curves[i].p6},${curves[i].p7},${curves[i].p8});<br/>`
      }
      else if(curves[i].p5==curves[i].p7&&curves[i].p6==curves[i].p8){
        代碼+=`${canvas代稱}.quadraticCurveTo(${curves[i].p3},${curves[i].p4},${curves[i].p7},${curves[i].p8});<br/>`
      }
      else{
        代碼+=`${canvas代稱}.bezierCurveTo(${curves[i].p3},${curves[i].p4},${curves[i].p5},${curves[i].p6},${curves[i].p7},${curves[i].p8});<br/>`
      }

    }
    代碼+=`${canvas代稱}.stroke();`
  }
  最終代碼顯示區域.innerHTML=代碼;
}

function 空代碼跑馬燈(){
  if(計時器%300<50){
    代碼="Js canvas貝茲曲線所見即所得工具　　　　版本1.2　2022夏　by琴房關燈俠<br/><br/>更新：新增了三套初始化動畫特效。<br/><br/>更新：新增了滾輪縮放功能。<br/>使用滑鼠滾輪，可以縮放畫布。<br/><br/>更新：連擊單一錨點，可以選取整條線段。<br/><br/>新增的線段，將於當前被選取的控制點旁生成。<br/>點擊空白處，可以使用矩形選取。<br/><br/>左下角白色橫條為比例尺，顯示所選輸出尺寸的實際寬度。<br/><br/>內置代碼修正功能，直線線段與二次貝茲曲線，將轉換為對應代碼。<br/><br/><br/>代碼將生成於此處";
    啟動中.innerHTML="載入中";
  }
  else if(計時器%300>=50&&計時器%300<100){
    代碼="Js canvas貝茲曲線所見即所得工具　　　　版本1.2　2022夏　by琴房關燈俠<br/><br/>更新：新增了三套初始化動畫特效。<br/><br/>更新：新增了滾輪縮放功能。<br/>使用滑鼠滾輪，可以縮放畫布。<br/><br/>更新：連擊單一錨點，可以選取整條線段。<br/><br/>新增的線段，將於當前被選取的控制點旁生成。<br/>點擊空白處，可以使用矩形選取。<br/><br/>左下角白色橫條為比例尺，顯示所選輸出尺寸的實際寬度。<br/><br/>內置代碼修正功能，直線線段與二次貝茲曲線，將轉換為對應代碼。<br/><br/><br/>代碼將生成於此處.";
    啟動中.innerHTML="載入中.";
  }
  else if(計時器%300>=100&&計時器%300<150){
    代碼="Js canvas貝茲曲線所見即所得工具　　　　版本1.2　2022夏　by琴房關燈俠<br/><br/>更新：新增了三套初始化動畫特效。<br/><br/>更新：新增了滾輪縮放功能。<br/>使用滑鼠滾輪，可以縮放畫布。<br/><br/>更新：連擊單一錨點，可以選取整條線段。<br/><br/>新增的線段，將於當前被選取的控制點旁生成。<br/>點擊空白處，可以使用矩形選取。<br/><br/>左下角白色橫條為比例尺，顯示所選輸出尺寸的實際寬度。<br/><br/>內置代碼修正功能，直線線段與二次貝茲曲線，將轉換為對應代碼。<br/><br/><br/>代碼將生成於此處..";
    啟動中.innerHTML="載入中..";
  }
  else{
    代碼="Js canvas貝茲曲線所見即所得工具　　　　版本1.2　2022夏　by琴房關燈俠<br/><br/>更新：新增了三套初始化動畫特效。<br/><br/>更新：新增了滾輪縮放功能。<br/>使用滑鼠滾輪，可以縮放畫布。<br/><br/>更新：連擊單一錨點，可以選取整條線段。<br/><br/>新增的線段，將於當前被選取的控制點旁生成。<br/>點擊空白處，可以使用矩形選取。<br/><br/>左下角白色橫條為比例尺，顯示所選輸出尺寸的實際寬度。<br/><br/>內置代碼修正功能，直線線段與二次貝茲曲線，將轉換為對應代碼。<br/><br/><br/>代碼將生成於此處...";
    啟動中.innerHTML="載入中..";
  }
  最終代碼顯示區域.innerHTML= 代碼;
}


let 前次滾輪狀態=0;
function 滾動縮放(){
  //if((滾輪狀態>3||滾輪狀態<-3)&&mouse.界內==true&&滑鼠按著==false){
  if((滾輪狀態>3||滾輪狀態<-3)&&mouse.界內==true&&滑鼠按著==false){
    
    if(滾輪狀態!==前次滾輪狀態){

    
      //輸出尺寸 += (輸出尺寸*滾輪狀態/300);
      if(滾輪狀態>0){
        輸出尺寸 *= 1+(滾輪狀態/600);
      }
      else{
        輸出尺寸 /= 1+(-滾輪狀態/600);
      }
      


      if(輸出尺寸<5){
        輸出尺寸=5;
        }
        if(輸出尺寸>32768){
          輸出尺寸=32768;
        }
        尺寸.value=`${Math.floor(輸出尺寸)}`;
    
        比例尺長度 = 輸出尺寸;
        document.getElementById('比例尺').style.width = `${比例尺長度}px`;
  
        原點x = Math.floor(輸出尺寸)/2;
        原點y = Math.floor(輸出尺寸)/2;


      if(原點x%1!==0){
        原點y = 原點x = (Math.floor(輸出尺寸)+1)/2;
      }

      前次滾輪狀態=滾輪狀態;

    }
    else{
      前次滾輪狀態=滾輪狀態=0;
    }
  }

  
}

function 代碼生成需求檢測() {
  if(點擊在按鈕處 == true){
    更新延遲 = 計時器;
    點擊在按鈕處 = false;
  }
}




function loop(){

  

  尺寸最大值();
  if(計時器-更新延遲==1){
    代碼生成();
  }
  繪製背景();
  if(網格開啟&&輸出尺寸<301){
    繪製網格();
  }
  拖曳選點();
  繪製曲線();
  代碼生成需求檢測();
  if(滑鼠按著==true&&mouse.未修正x>=0&&mouse.未修正x<=height){
    代碼生成();
  }
  if(curves.length==0){
    空代碼跑馬燈();
  }


  //除錯用 繪製鼠標
  /*ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 2, 0, 2 * Math.PI);
  ctx.fillStyle = "hsla(0,100%,0%,1)"
  ctx.fill();*/
  


  繪製被選標記();
  if(矩形選取模式 == true){
    繪製矩形選取區();
  }



  //處理滾動與否
  if(頁面容器.className==""){
    if(mouse.界內==true){
      body.style.overflow='hidden';
    }
    else{
      body.style.overflow='scroll';
    }
  }
  滾動縮放();


  焦點=document.activeElement;

  document.getElementById('t').innerHTML = `輸出尺寸 =`;
  /*document.getElementById('t').innerHTML = `滾輪狀態=${滾輪狀態}，當前畫布長寬=${width}px，整數模式=${整數模式}，對齊模式=${對齊模式}，mouse.x=${mouse.x}，mouse.y=${mouse.y}，mouse.未修正x=${mouse.未修正x}，mouse.未修正y=${mouse.未修正y}`;
  if(curves.length>0){
    document.getElementById('t').innerHTML = `滾輪狀態=${滾輪狀態}，當前畫布長寬=${width}px，整數模式=${整數模式}，對齊模式=${對齊模式}，mouse.x=${mouse.x}，mouse.y=${mouse.y}，mouse.未修正x=${mouse.未修正x}，mouse.未修正y=${mouse.未修正y}，p1=${curves[0].p1}，p2=${curves[0].p2}，p3=${curves[0].p3}，p4=${curves[0].p4}，p5=${curves[0].p5}，p6=${curves[0].p6}，p7=${curves[0].p7}，p8=${curves[0].p8}`;
  }*/


  重置檢測();
  計時器++;

  requestAnimationFrame(loop);
}




loop();