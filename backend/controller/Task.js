const { c } = require("tar");
const Task=require("../model/Task");
const User=require("../model/user");
const mongoose=require("mongoose")
const {createTask}=require("../type");
exports.createTask=async(req,res)=>{
    try{
        const parsePayload=createTask.safeParse(req.body);
        if(!parsePayload.success)
        {
            return res.status(411).json({
                msg:"you sent the wrong input"
            })
        }
        const {title,description}=req.body;
        console.log(`${title} and ${description} ${req.user._id}`);
        const newTask={
            title:title,
            description:description,
            owner:req.user._id
        }
      
        console.log(`${title} and ${description}`);
        const newtask=await Task.create(newTask);
        const user=await User.findById(req.user._id);
        user.task.push(newtask._id);
        await user.save();
       // await newtask.save();
        res.status(201).json({
            success:true,
            task:newtask
        })

    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            msg:error.message
        })
    }
}


exports.getTask=async(req,res)=>{
    try{
        //const id=req.params.id;
      //  console.log(id);

        const userid=req.user.id;
        const user=await User.findById({_id:userid});
        console.log(user);
        let taskList=[];
        console.log("alsjflsjadfkljl")
        for(let i=0;i<user.task.length;i++)
        {
            let taskid=user.task[i];
            console.log(taskid)
            const taskresult=await Task.findById({_id:taskid})
            taskList.push(taskresult)
        }
        return res.status(200).json({
            taskList
        })

    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            msg:error.message
        })
    }
}


exports.getAllTask=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log("id for object",id);
        //checking that whether object is valid or not
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return  res.status(401).json({
                success:false,
                msg:"task does not exist"
            })
        }
        const userid=req.user._id;
        //here before getting the task you should check whether the id that customer is passing exist in the user table or not
        const user=await User.findById({_id:userid});

        if(!user)
        {
            res.status(500).json({
                success:false,
                msg:"please login first"
            }) 
        }

        console.log("user is ",user.task)
        
        if(!user.task.includes(id))
        {
            return  res.status(401).json({
                success:false,
                msg:"task does not exist"
            })
        }
        const task=await Task.findById({_id:id});
        if(!task)
        {
            return  res.status(401).json({
                success:false,
                msg:"task does not exist"
            })
        }
        return  res.status(200).json({
            task
        })

    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            msg:error.message
        })
    }
}

exports.markAsImportant=async(req,res)=>{
    const id=req.params.id;
    console.log("id for object",id);
    //checking that whether object is vali
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return  res.status(401).json({
            success:false,
            msg:"task does not exist"
        })
    }
    const userid=req.user._id;
    //here before getting the task you should check whether the id that customer is passing exist in the user table or not
    const user=await User.findById({_id:userid});

    console.log("user is ",user.task)
    
    if(!user.task.includes(id))
    {
        return  res.status(401).json({
            success:false,
            msg:"task does not exist"
        })
    }
    console.log("flaggedtask",user.flaggedTask)
    //already flagged we need to unflagged it [basically remove it from the exisiting array]
    if(user.flaggedTask.includes(id))
    { 
        console.log("ksajfskajflkjsfadkljsakldfjklsadfjlkaf");
        const newflagtasks=user.flaggedTask.filter((element)=>
        {
            console.log(element)
            element._id!==id
        } );
        user.flaggedTask=newflagtasks;
        await user.save();
        return res.status(200).json({
        success:true,
        user
        })

    }

    user.flaggedTask.push(id);
    await user.save();
    res.status(200).json({
        success:true,
        user
    })

    


}


exports.getmarkAsImportant=async(req,res)=>{
    try{
        const userid=req.user._id;
        //here before getting the task you should check whether the id that customer is passing exist in the user table or not
        const user=await User.findById({_id:userid});
        if(!user)
        {
            res.status(500).json({
                success:false,
                msg:"please login first"
            }) 
        }
        console.log("asfasdfasdf",user.flaggedTask)
        const result=user.flaggedTask
        let newresult=[];
        for(let i=0;i<result.length;i++)
        {
            const taskid=result[i];
            const task=await Task.findById({_id:taskid});
            newresult.push(task);
        }
        console.log("user is ",user.flaggedTask)
        res.status(200).json({
            success:true,
            newresult
        })
    }
    catch(e)
    {
        res.status(500).json({
            success:false,
            msg:e.message
        }) 
    }
    

    


}

exports.editTask=async(req,res)=>{
    try{

        const id=req.params.id;

        const userid=req.user._id;
        const user=await User.findById({_id:userid});
        if(!user)
        {
            res.status(500).json({
                success:false,
                msg:"please login first"
            }) 
        }
        
        if(!user.task.includes(id))
        {
            return  res.status(401).json({
                success:false,
                msg:"task does not exist"
            })
        }

        const {title,description}=req.body;
        
        if(title)
        {
            user.title=title
        }

        if(description)
        {
            user.description=description
        }

        await user.save();
        return res.status(200).json({
            success:true,
            message:"task updated successfully"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }


}


exports.completedTask=async(req,res)=>{
    try{

        const id=req.params.id;


        const user=await User.findById({_id:userid});
        
        if(!user.task.includes(id))
        {
            return  res.status(401).json({
                success:false,
                msg:"task does not exist"
            })
        }

        await Task.findByIdAndUpdate({
            _id:id
        },{
            completed:true
        })
        return res.status(200).json({
            success:true,
            message:"task updated successfully"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }


}


exports.deleteTask=async(req,res)=>{
    try{

        const id=req.params.id;

        const userid=req.user._id;
        const user=await User.findById({_id:userid});
        
        if(!user.task.includes(id))
        {
            return  res.status(401).json({
                success:false,
                msg:"task does not exist"
            })
        }
        //removing from the task list 
        if(user.task.includes(id))
        { 
            const newflagtasks=user.task.filter((element)=>
            {
                console.log(element)
                element._id!==id
            } );
            user.task=newflagtasks;
            await user.save();

        }
        //removing from the flagged task list
        if(user.flaggedTask.includes(id))
        { 
            const newflagtasks=user.task.filter((element)=>
            {
                console.log(element)
                element._id!==id
            } );
            user.flaggedTask=newflagtasks;
            await user.save();

        }


        


       
        await user.save();
        return res.status(200).json({
            success:true,
            message:"task updated successfully"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }


}



