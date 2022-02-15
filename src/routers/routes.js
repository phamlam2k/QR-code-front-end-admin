import { 
    ADMIN_LOGIN, 
    ADMIN_STUDENT, 
    ADMIN_STUDENT_CREATE, 
    ADMIN_SUBJECT, 
    ADMIN_TEACHER,
    ADMIN_STUDENT_DETAIL,
    ADMIN_STUDENT_EDIT,
    ADMIN_TEACHER_CREATE,
    ADMIN_TEACHER_DETAIL,
    ADMIN_TEACHER_EDIT,
    ADMIN_SUBJECT_CREATE,
    ADMIN_SUBJECT_DETAIL,
    ADMIN_SUBJECT_EDIT,
    ADMIN_TABLE_REGISTER,
    ADMIN_TABLE_REGISTER_CREATE,
    ADMIN_ATTENDANCE,
    ADMIN_USER,
    ADMIN_USER_DETAIL,
    ADMIN_USER_EDIT,
    ADMIN_POST,
    ADMIN_POST_DETAIL,
    ADMIN_POST_CREATE
} from "../config/path";


export const routes = [
    {
        path: ADMIN_LOGIN,
        exact: true,
        isPrivate: false,
        restricted: true,
        component: import('../components/auth/Login')
    },
    {
        path: ADMIN_STUDENT,
        exact: true,
        isPrivate: true,
        restricted: false,
        isTeacher: true,
        component: import('../components/student/Student')
    },
    {
        path: ADMIN_STUDENT_CREATE,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/student/CreateStudent')
    },
    {
        path: ADMIN_STUDENT_DETAIL,
        exact: true,
        isPrivate: true,
        restricted: false,
        isTeacher: true,
        component: import('../components/student/StudentDetail')
    },
    {
        path: ADMIN_STUDENT_EDIT,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/student/UpdateStudent')
    },
    {
        path: ADMIN_TEACHER,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/teacher/Teacher')
    },
    {
        path: ADMIN_TEACHER_CREATE,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/teacher/CreateTeacher')
    },
    {
        path: ADMIN_TEACHER_DETAIL,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/teacher/TeacherDetail')
    },
    {
        path: ADMIN_TEACHER_EDIT,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/teacher/UpdateTeacher')
    },
    {
        path: ADMIN_SUBJECT,
        exact: true,
        isPrivate: true,
        restricted: false,
        isTeacher: true,
        component: import('../components/subject/Subject')
    },
    {
        path: ADMIN_SUBJECT_CREATE,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/subject/CreateSubject')
    },
    {
        path: ADMIN_SUBJECT_DETAIL,
        exact: true,
        isPrivate: true,
        restricted: false,
        isTeacher: true,
        component: import('../components/subject/SubjectDetail')
    },
    {
        path: ADMIN_SUBJECT_EDIT,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/subject/UpdateSubject')
    },
    {
        path: ADMIN_TABLE_REGISTER,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/table_register/Table')
    },
    {
        path: ADMIN_TABLE_REGISTER_CREATE,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/table_register/CreateTable')
    },
    {
        path: ADMIN_ATTENDANCE,
        exact: true,
        isPrivate: true,
        restricted: false,
        isTeacher: true,
        component: import('../components/attendance/Attendance')
    },
    {
        path: ADMIN_USER,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/user/User')
    },
    {
        path: ADMIN_USER_DETAIL,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/user/UserDetail')
    },
    {
        path: ADMIN_USER_EDIT,
        exact: true,
        isPrivate: true,
        restricted: false,
        component: import('../components/user/UpdateUser')
    },
    {
        path: ADMIN_POST,
        exact: true,
        isPrivate: true,
        isTeacher: true,
        restricted: false,
        component: import('../components/post/Post')
    },
    {
        path: ADMIN_POST_CREATE,
        exact: true,
        isPrivate: true,
        isTeacher: true,
        component: import('../components/post/CreatePost')
    },
    {
        path: ADMIN_POST_DETAIL,
        exact: true,
        isPrivate: true,
        component: import('../components/post/PostDetail')
    }
]