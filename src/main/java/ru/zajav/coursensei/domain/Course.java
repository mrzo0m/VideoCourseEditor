package ru.zajav.coursensei.domain;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

import org.joda.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import ru.zajav.coursensei.domain.util.CustomLocalDateSerializer;
import ru.zajav.coursensei.domain.util.ISO8601LocalDateDeserializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * A Course.
 */
@Document(collection = "COURSE")
public class Course implements Serializable {

	private static final long serialVersionUID = 96639545237296698L;

	@Id
    private String id;

    @Field("title")
    private String title;

    @Field("duration")
    private Integer duration;

    @JsonSerialize(using = CustomLocalDateSerializer.class)
    @JsonDeserialize(using = ISO8601LocalDateDeserializer.class)
    @Field("start_date")
    private LocalDate startDate;

    @Field("description")
    private String description;
    
    @Field("authors")
    private Set<Author> authors;

	public Set<Author> getAuthors() {
		return authors;
	}

	public void setAuthors(Set<Author> authors) {
		this.authors = authors;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
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

        Course course = (Course) o;

        if ( ! Objects.equals(id, course.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", title='" + title + "'" +
                ", duration='" + duration + "'" +
                ", startDate='" + startDate + "'" +
                ", description='" + description + "'" +
                '}';
    }
}
