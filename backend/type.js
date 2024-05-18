const z=require("zod");

const createTask=z.object({
    title:z.string(),
    description:z.string()
})

module.exports={
    createTask
}