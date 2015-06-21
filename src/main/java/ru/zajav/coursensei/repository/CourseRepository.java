package ru.zajav.coursensei.repository;

import ru.zajav.coursensei.domain.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Course entity.
 */
public interface CourseRepository extends MongoRepository<Course,String> {

}
