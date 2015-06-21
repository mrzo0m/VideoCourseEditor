package ru.zajav.coursensei.web.rest.mapper;

import ru.zajav.coursensei.domain.*;
import ru.zajav.coursensei.web.rest.dto.CourseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Course and its DTO CourseDTO.
 */
@Mapper(uses = {})
public interface CourseMapper {

    CourseDTO courseToCourseDTO(Course course);

    Course courseDTOToCourse(CourseDTO courseDTO);
}
