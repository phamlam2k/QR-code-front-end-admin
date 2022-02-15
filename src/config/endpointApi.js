export const API_BASE = "http://127.0.0.1:8000/api"

export const API_LOGIN = `${API_BASE}/qr-code/user`

export const API_STUDENT = `${API_BASE}/qr-code/student`
export const API_STUDENT_DETAIL = `${API_STUDENT}/:id`
export const API_STUDENT_EDIT = `${API_STUDENT_DETAIL}`

export const API_TEACHER = `${API_BASE}/qr-code/teacher`
export const API_TEACHER_DETAIL = `${API_TEACHER}/:id`
export const API_TEACHER_EDIT = `${API_TEACHER_DETAIL}`

export const API_SUBJECT = `${API_BASE}/qr-code/subject`
export const API_SUBJECT_DETAIL = `${API_SUBJECT}/:id`
export const API_SUBJECT_EDIT = `${API_SUBJECT_DETAIL}`

export const API_TABLE_REGISTER = `${API_BASE}/qr-code/table-register`
export const API_TABLE_REGISTER_DETAIL = `${API_TABLE_REGISTER}/:id`
export const API_TABLE_REGISTER_EDIT = `${API_TABLE_REGISTER_DETAIL}`

export const API_ATTENDANCE = `${API_BASE}/qr-code/attendance`

export const API_USER_DETAIL = `${API_LOGIN}/:id`

export const API_POST = `${API_BASE}/qr-code/post`
export const API_POST_DETAIL = `${API_POST}/:id`

