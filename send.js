export function sendMessage(to, msg) {
    var data = {
        receiver: to,
        msg: msg
    };
    fetch("https://mysterious-cove-23804.herokuapp.com/sendMessage", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}