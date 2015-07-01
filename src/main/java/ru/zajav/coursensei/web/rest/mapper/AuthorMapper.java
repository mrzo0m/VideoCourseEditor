package ru.zajav.coursensei.web.rest.mapper;

import ru.zajav.coursensei.domain.*;
import ru.zajav.coursensei.web.rest.dto.AuthorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Author and its DTO AuthorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AuthorMapper {

    AuthorDTO authorToAuthorDTO(Author author);

    Author authorDTOToAuthor(AuthorDTO authorDTO);
}
