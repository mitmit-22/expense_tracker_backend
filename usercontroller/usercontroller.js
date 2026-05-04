import db from "../database/db.js";


export const add_expense =(req,res)=>{

    const {amount , category} = req.body;

    const sql = "insert into expense (userid, amount,category) values (?,?,?)";

    db.query(sql,[req.userid, amount , category],(err)=>{

        if(err) return res.status(500).json(err);

        res.status(201).json("expense added succesfully");

    });

};


export const get_expense = (req,res) =>{

    const sql = "select * from expense where userid = ?";

    db.query(sql,[req.userid],(err,data)=>{
        if (err) return res.status(500).json(err);

        res.json(data);
    });


};


export const update_expense = (req,res)=>{
    const {id} = req.params;
    const {amount,category} = req.body;

    const sql = `update expense,
    set amount = ?, category = ?
    where id = ? and user_id = ?`;

    db.query(sql,[amount,category,id,req.user_id],(err)=>{

        if(err) return res.status(500).json(err);

        res.status(200).json("updated succesfully")

    });
};

export const delete_expense = (req,res)=>{

    const {id} = req.params;

       const sql = `
        DELETE FROM expense
        WHERE id = ? AND userid = ?
    `;

    db.query(sql,[id,req.userid],(err)=>{
        if (err) return res.status(500).json(err);

        res.status(200).json("deleted succesfully");
    });

};