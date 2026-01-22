ALTER TABLE Medical_History
ADD CONSTRAINT fk_medicalhistory_record
FOREIGN KEY (record_id)
REFERENCES Medical_Record(record_id);
