import type { AcademicLecture } from './academic-lecture/academic-lecture.type'
import type { AdministrativeYears } from './administrative-years/administrative-years.type'
import type { GrowthRecord } from './growth-record/growth-record.type'
import type { LeisureTime } from './leisure-time/leisure-time.type'
import type { PrimeOfLife } from './prime-of-life/prime-of-life.type'
import type { TeacherStudentSnapshots } from './teacher-student-snapshots/teacher-student-snapshots.type'

export interface LifeSnippets {
  teacherStudentSnapshots?: TeacherStudentSnapshots; // 可選屬性
  growthRecord?: GrowthRecord;
  leisureTime?: LeisureTime;
  academicLecture?: AcademicLecture;
  primeOfLife?: PrimeOfLife;
  administrativeYears?: AdministrativeYears;
}
