package uk.gov.hmcts.taskmanager.repository;

import uk.gov.hmcts.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {}

