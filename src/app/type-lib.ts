type Message = {
    user: string | undefined
    room: string | undefined
    text: string | undefined
    datetime: number | undefined
};

type userOption = {
    user: string | undefined
    profileImg: string | undefined
};

type sendMessageResult = {
    status: string | undefined
    error: string | undefined
};

export { Message, userOption, sendMessageResult }