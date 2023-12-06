import {Avatar, Button} from "antd";
import {Markdown} from "@/components";
import aiImg from "@/assets/img/avatar/ai.jpg";
import {UserOutlined} from "@ant-design/icons";
import {MessageBubble} from "../styled";
import useStore from '../store'

function Bubble({isUser, content}) {
    const {sendMessage} = useStore()

    return (
        <MessageBubble isUserMessage={isUser}>
            {isUser ? (
                <Avatar icon={<UserOutlined/>} className="avatar" size="large"/>
            ) : (
                <Avatar src={aiImg} className="avatar" size="large"/>
            )}
            <div className="content">
                {content ? (isUser ? (<div className="userContent">{content}</div>) : (<Markdown content={content}/>))
                    : <Button onClick={() => sendMessage()}>我的cpu不小心干烧了...点击重新提问</Button>}
            </div>
        </MessageBubble>
    );
}

export default Bubble;
