package com.niche.ng.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.niche.ng.service.MotherBedService;
import com.niche.ng.web.rest.errors.BadRequestAlertException;
import com.niche.ng.web.rest.util.HeaderUtil;
import com.niche.ng.web.rest.util.PaginationUtil;
import com.niche.ng.service.dto.MotherBedDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MotherBed.
 */
@RestController
@RequestMapping("/api")
public class MotherBedResource {

    private final Logger log = LoggerFactory.getLogger(MotherBedResource.class);

    private static final String ENTITY_NAME = "motherBed";

    private final MotherBedService motherBedService;

    public MotherBedResource(MotherBedService motherBedService) {
        this.motherBedService = motherBedService;
    }

    /**
     * POST  /mother-beds : Create a new motherBed.
     *
     * @param motherBedDTO the motherBedDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new motherBedDTO, or with status 400 (Bad Request) if the motherBed has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mother-beds")
    @Timed
    public ResponseEntity<MotherBedDTO> createMotherBed(@Valid @RequestBody MotherBedDTO motherBedDTO) throws URISyntaxException {
        log.debug("REST request to save MotherBed : {}", motherBedDTO);
        if (motherBedDTO.getId() != null) {
            throw new BadRequestAlertException("A new motherBed cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MotherBedDTO result = motherBedService.save(motherBedDTO);
        return ResponseEntity.created(new URI("/api/mother-beds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mother-beds : Updates an existing motherBed.
     *
     * @param motherBedDTO the motherBedDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated motherBedDTO,
     * or with status 400 (Bad Request) if the motherBedDTO is not valid,
     * or with status 500 (Internal Server Error) if the motherBedDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mother-beds")
    @Timed
    public ResponseEntity<MotherBedDTO> updateMotherBed(@Valid @RequestBody MotherBedDTO motherBedDTO) throws URISyntaxException {
        log.debug("REST request to update MotherBed : {}", motherBedDTO);
        if (motherBedDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MotherBedDTO result = motherBedService.save(motherBedDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, motherBedDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mother-beds : get all the motherBeds.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of motherBeds in body
     */
    @GetMapping("/mother-beds")
    @Timed
    public ResponseEntity<List<MotherBedDTO>> getAllMotherBeds(Pageable pageable) {
        log.debug("REST request to get a page of MotherBeds");
        Page<MotherBedDTO> page = motherBedService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mother-beds");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /mother-beds/:id : get the "id" motherBed.
     *
     * @param id the id of the motherBedDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the motherBedDTO, or with status 404 (Not Found)
     */
    @GetMapping("/mother-beds/{id}")
    @Timed
    public ResponseEntity<MotherBedDTO> getMotherBed(@PathVariable Long id) {
        log.debug("REST request to get MotherBed : {}", id);
        Optional<MotherBedDTO> motherBedDTO = motherBedService.findOne(id);
        return ResponseUtil.wrapOrNotFound(motherBedDTO);
    }

    /**
     * DELETE  /mother-beds/:id : delete the "id" motherBed.
     *
     * @param id the id of the motherBedDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mother-beds/{id}")
    @Timed
    public ResponseEntity<Void> deleteMotherBed(@PathVariable Long id) {
        log.debug("REST request to delete MotherBed : {}", id);
        motherBedService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
