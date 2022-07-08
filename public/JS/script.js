const socket = io.connect("http://localhost:3000/");

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const append = (name, message, time, position) => {
    if (position === "right") {
        $(`<div class='flex justify-end mb-2'><div class='rounded py-2 px-3' style='background-color: #F2F2F2'><p class='text-sm text-teal'>${name}</p><p class='text-sm mt-1'>${message}</p><p class='text-right text-xs text-grey-dark mt-1'>${time}</p></div></div>`).appendTo(".messages-container");
    }
    else if (position === "left") {
        $(`<div class='flex mb-2'><div class='rounded py-2 px-3' style='background-color: #F2F2F2'><p class='text-sm text-teal'>${name}</p><p class='text-sm mt-1'>${message}</p><p class='text-right text-xs text-grey-dark mt-1'>${time}</p></div></div>`).appendTo(".messages-container");
    }
    else {
        $(`<div class='flex justify-center mb-2'><div class='rounded py-2 px-3' style='background-color: #F2F2F2'><p class='text-sm text-teal'>${name}</p><p class='text-sm mt-1'>${message}</p><p class='text-right text-xs text-grey-dark mt-1'>${time}</p></div></div>`).appendTo(".messages-container");
    }
}

const scrollToBottom = () => {
    var d = $('.scroll-this');
    d.scrollTop(d.prop("scrollHeight"));
}

$("#send").click(() => {
    // alert("OOPS")
    const message = $("#messageInp").val();
    console.log(message);
    append("You", message, formatAMPM(new Date), "right");
    socket.emit("send", message);
    scrollToBottom();
    $("#messageInp").val("");
})

socket.emit("new-user-joined", name);

socket.on("user-joined", name => {
    append(name, "joined the chat", "", "center");
    scrollToBottom();
})

socket.on("receive", data => {
    append(data.name, data.message, formatAMPM(new Date), "left");
    scrollToBottom();
})

socket.on("left", name => {
    append(`${name} left the chat`, "", "", "center");
    scrollToBottom();
})