export function formatDateTime(value){
    const m = new Date(value);
    m.setHours(m.getHours()+7)
    return ("0" + m.getUTCHours()).slice(-2)  + ":"+
        ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        ("0" + m.getUTCSeconds()).slice(-2) + " " +
        ("0" + m.getUTCDate()).slice(-2) + "/"+
        ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/"+
        m.getUTCFullYear();
}