import { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';
const Sidebar = () => {
    const [extended, setExtended] = useState(true);
    const { onSent, previousPrompt, setRecentPrompt } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };
    return (
        <div className='sidebar'>
            <div className='top'>
                <img
                    src={assets.menu_icon}
                    alt=''
                    className='menu'
                    onClick={() => setExtended((prev) => !prev)}
                />
                <div className='new-chat'>
                    <img src={assets.plus_icon} alt='' />
                    {extended ? <p>New Chat</p> : null}
                </div>
                <div className='recent'>
                    {extended ? (
                        <>
                            <p className='recent-title'>Recent</p>
                            {previousPrompt?.map((item, index) => {
                                return (
                                    <div
                                        onClick={() => loadPrompt(item)}
                                        className='recent-entry'
                                        key={index}
                                    >
                                        <img src={assets.message_icon} alt='' />
                                        <p>{item}...</p>
                                    </div>
                                );
                            })}
                        </>
                    ) : null}
                </div>
            </div>
            <div className='bottom'>
                <div className='bottom-item recent-entry'>
                    <img src={assets.question_icon} alt='' />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.history_icon} alt='' />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.setting_icon} alt='' />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
