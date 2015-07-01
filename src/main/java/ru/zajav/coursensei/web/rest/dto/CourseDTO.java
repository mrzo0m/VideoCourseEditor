package ru.zajav.coursensei.web.rest.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

import org.joda.time.LocalDate;

import ru.zajav.coursensei.domain.Author;
import ru.zajav.coursensei.domain.util.CustomLocalDateSerializer;
import ru.zajav.coursensei.domain.util.ISO8601LocalDateDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;


/**
 * A DTO for the Course entity.
 */
public class CourseDTO implements Serializable {

	private static final long serialVersionUID = -1246187721899436303L;

	private String id;

    private String title;

    private Integer duration;

    @JsonSerialize(using = CustomLocalDateSerializer.class)
    @JsonDeserialize(using = ISO8601LocalDateDeserializer.class)
    private LocalDate startDate;

    private String description;

    private Set<Author> authors;

    public Set<Author> getAuthors() {
		return authors;
	}

	public void setAuthors(Set<Author> authors) {
		this.authors = authors;
	}

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public LocalDate getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CourseDTO courseDTO = (CourseDTO) o;

        if ( ! Objects.equals(id, courseDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "CourseDTO{" +
                "id=" + id +
                ", title='" + title + "'" +
                ", duration='" + duration + "'" +
                ", startDate='" + startDate + "'" +
                ", description='" + description + "'" +
                ", authors='" + authors + "'" +
                '}';
    }
}
