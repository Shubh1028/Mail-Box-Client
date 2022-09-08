import "./Mail.css";
import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUsername } from "../../helper";
import { useEffect } from "react";


const Mail = (props) => {
  const regex = /(<([^>]+)>)/gi;
  const editorMessage = props.mail.message.replace(regex, "");
  const user = localStorage.getItem("email");
  const username = getUsername(user);

  const dispatch = useDispatch()

  const openHandler = (key) => {
    if(!props.isSentBox) {
    fetch(`https://mail-box-client-d6ce4-default-rtdb.firebaseio.com/${username}/receiver/${key}.json`, {
        method: "PUT",
        body: JSON.stringify({
            receiver: props.mail.receiver,
            subject: props.mail.subject,
            message: props.mail.message,
            sender: props.mail.sender,
            isOpen: true
        })
    }).then((res) => {
        console.log('ok')
    })
}
}

useEffect(() => {
    openHandler(props.mail.key)
},[])


const deleteHandler = (key) => {
   

    props.deleteItem(key)
}


  return (
        <div className="inbox_mail">
                <div>
                <span><AiOutlineStar /></span>
               {!props.mail.isOpen && !props.isSentBox && <span className="dot">&nbsp;</span>}
                </div>
                {props.isSentBox === false && <NavLink state={props.mail} to={`/inbox/${props.mail.key}`} onClick={openHandler.bind(null, props.mail.key)}>
               <p>{props.mail.subject}</p>
                </NavLink>}
                {props.isSentBox === true && <NavLink state={props.mail} to={`/sent/${props.mail.key}`}>
                    <p>{props.mail.subject}</p>
                </NavLink>}
                <span className="delete_handler" onClick={deleteHandler.bind(null, props.mail.key)}><AiOutlineDelete /></span>
            </div>
  );
};
export default Mail;
