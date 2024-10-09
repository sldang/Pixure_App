import './Message.css'

export default function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="></img>
            <p className="messageText">Hello this is a message</p>
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  )
}
