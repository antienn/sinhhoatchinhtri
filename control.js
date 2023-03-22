document.querySelector('.upload').addEventListener('click', () =>{
    document.querySelector(".modall").classList.remove("hide")
})
document.querySelector('.fas.fa-times').addEventListener('click', () => {
    document.querySelector(".modall").classList.add("hide")
})

document.querySelector(".btnlearnmore").onclick = () =>{
    document.querySelector(".timeline").scrollIntoView();
}
document.querySelector(".content1").onclick = () =>{
    document.querySelector(".timeline ul li:nth-child(1)").scrollIntoView();
}
document.querySelector(".content2").onclick = () =>{
    document.querySelector(".timeline ul li:nth-child(8)").scrollIntoView();
}
document.querySelector(".content3").onclick = () =>{
    document.querySelector(".commment").scrollIntoView();
}
document.querySelector("#ava").onclick = () =>{
    document.querySelector("#myfile").click();
}
document.querySelector("#myfile").onchange = () =>{
    let file = document.querySelector("#myfile").files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(){
        document.querySelector("#ava").src = reader.result;
    }
}
document.querySelector(".modal__button-send").onclick = () =>{
    var bs64 = document.querySelector("#ava").src;
    var name = document.querySelector("#name").value;
    var mess = document.querySelector("#mess").value;
    var d = new Date();
    var stringdate ="";
    if(d.getMonth() + 1 < 10){
        stringdate += "0";
    }
    stringdate += (d.getMonth() + 1).toString();
    stringdate += "/";
    if(d.getDate()< 10){
        stringdate += "0";
    }
    stringdate += d.getDate().toString();
    stringdate += "/";
    stringdate += d.getFullYear().toString();
    console.log(stringdate);
    const obj ={
        "name":name,
        "content": mess,
        "date":stringdate,
        "urlimage":bs64
    }
    if(bs64 && name && mess){
        data.unshift(obj);
        document.querySelector(".commment").innerHTML = `<div class="title">
                                                            <div class="cc">Nhận Xét</div>
                                                        </div>`
        document.querySelector(".commment").innerHTML += data.slice(0,data.length).map(e => `
              <div class="comments">
                <div class="comment-container">
                  <div class="user">
                    <div class="user-pic">
                      <img src=${e.urlimage}>
                    </div>
                    <div class="user-info">
                      <span>${e.name}</span>
                      <p>${e.date}</p>
                    </div>
                  </div>
                  <p class="comment-content">
                    ${e.content}
                  </p>
                </div>
              </div>
            `).join("")

        fetch('https://be-shct.onrender.com/managercmt/upload',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({data: obj})
        });
        document.querySelector(".modall").classList.add("hide")
    }
}

