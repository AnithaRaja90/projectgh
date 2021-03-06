package com.niche.ng.service.mapper;

import com.niche.ng.domain.*;
import com.niche.ng.service.dto.MotherBedDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MotherBed and its DTO MotherBedDTO.
 */
@Mapper(componentModel = "spring", uses = {NurseryMapper.class})
public interface MotherBedMapper extends EntityMapper<MotherBedDTO, MotherBed> {

    @Mapping(source = "nursery.id", target = "nurseryId")
    @Mapping(source = "nursery.nurseryName", target = "nurseryNurseryName")
    MotherBedDTO toDto(MotherBed motherBed);

    @Mapping(source = "nurseryId", target = "nursery")
    MotherBed toEntity(MotherBedDTO motherBedDTO);

    default MotherBed fromId(Long id) {
        if (id == null) {
            return null;
        }
        MotherBed motherBed = new MotherBed();
        motherBed.setId(id);
        return motherBed;
    }
}
