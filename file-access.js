const fs=require("fs");
fs.readFile("./cool.txt","utf-8",function(err,content){
    if(err)console.log(err)
    else console.log(content);
})

fs.writeFile("./awesome.txt","hello mfs 😊",function(err){
    if(err)console.log(err)
    else console.log("done writing");
})

// for(let i=0;i<10;i++){
//     fs.writeFile(`./backup/text-${i+1}`,"good morning🙌",function(err){
//         if (err)console.log(err)
//         else console.log("created");
//     })
// }


// for(let i=0;i<10;i++){
//     fs.unlink(`./backup/text-${i+1}`,function(err){
//         if (err)console.log(err)
//         else console.log("deleted");
//     })
// }

// let each=[];
// let temp=fs.readdir("./backups",function(err){
//     console.log("files");
// });
// temp.map((element)=>{}
// each=element.split(".");
// if(each[1]==="html"){
// }
// }
// )

fs.readdir("./backups",function(err,files){
    console.log("files");
    files.map((element)=>{
        fs.unlink(`./backup/${element}`,function(err){
            if (err)console.log(err)
            else console.log("deleted");
        })
    })
});
