package ru.zajav.coursensei.web.rest;

import com.codahale.metrics.annotation.Timed;
import ru.zajav.coursensei.domain.Course;
import ru.zajav.coursensei.repository.CourseRepository;
import ru.zajav.coursensei.web.rest.dto.CourseDTO;
import ru.zajav.coursensei.web.rest.mapper.CourseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Course.
 */
@RestController
@RequestMapping("/api")
public class CourseResource {

    private final Logger log = LoggerFactory.getLogger(CourseResource.class);

    @Inject
    private CourseRepository courseRepository;

    @Inject
    private CourseMapper courseMapper;

    /**
     * POST  /courses -> Create a new course.
     */
    @RequestMapping(value = "/courses",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> create(@RequestBody CourseDTO courseDTO) throws URISyntaxException {
        log.debug("REST request to save Course : {}", courseDTO);
        if (courseDTO.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new course cannot already have an ID").build();
        }
        Course course = courseMapper.courseDTOToCourse(courseDTO);
        courseRepository.save(course);
        return ResponseEntity.created(new URI("/api/courses/" + courseDTO.getId())).build();
    }

    /**
     * PUT  /courses -> Updates an existing course.
     */
    @RequestMapping(value = "/courses",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> update(@RequestBody CourseDTO courseDTO) throws URISyntaxException {
        log.debug("REST request to update Course : {}", courseDTO);
        if (courseDTO.getId() == null) {
            return create(courseDTO);
        }
        Course course = courseMapper.courseDTOToCourse(courseDTO);
        courseRepository.save(course);
        return ResponseEntity.ok().build();
    }

    /**
     * GET  /courses -> get all the courses.
     */
    @RequestMapping(value = "/courses",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional(readOnly = true)
    public List<CourseDTO> getAll() {
        log.debug("REST request to get all Courses");
        return courseRepository.findAll().stream()
            .map(course -> courseMapper.courseToCourseDTO(course))
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * GET  /courses/:id -> get the "id" course.
     */
    @RequestMapping(value = "/courses/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<CourseDTO> get(@PathVariable String id) {
        log.debug("REST request to get Course : {}", id);
        return Optional.ofNullable(courseRepository.findOne(id))
            .map(course -> courseMapper.courseToCourseDTO(course))
            .map(courseDTO -> new ResponseEntity<>(
                courseDTO,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /courses/:id -> delete the "id" course.
     */
    @RequestMapping(value = "/courses/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable String id) {
        log.debug("REST request to delete Course : {}", id);
        courseRepository.delete(id);
    }
}
