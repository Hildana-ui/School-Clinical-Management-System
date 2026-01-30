ALTER TABLE Medical_Record
ADD CONSTRAINT fk_medicalrecord_student
FOREIGN KEY (user_id)
REFERENCES Student(user_id);
