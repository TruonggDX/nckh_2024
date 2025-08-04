package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.BillDetailsEntity;
import com.hunre.it.webstudyonline.model.dto.CategoryRevenueDto;
import com.hunre.it.webstudyonline.model.dto.CourseRevenueDto;
import com.hunre.it.webstudyonline.model.dto.RevenueMonthDto;
import com.hunre.it.webstudyonline.model.dto.RevenueWeekDto;
import com.hunre.it.webstudyonline.model.dto.RevenueYearDto;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BillDetailsRepository extends JpaRepository<BillDetailsEntity,Long> {
    @Query(value = "SELECT b FROM BillDetailsEntity b WHERE b.deleted=false AND b.billEntity.id =:billId")
    Page<BillDetailsEntity> getByBillId(@Param("billId") Long billId, Pageable pageable);


    @Query(value = "SELECT b FROM BillDetailsEntity b WHERE b.billEntity.id =:billId AND b.deleted=false ")
    List<BillDetailsEntity> findByBillId(Long billId);

    @Query("SELECT new com.hunre.it.webstudyonline.model.dto.RevenueYearDto("
        + "YEAR(b.createdDate), COALESCE(SUM(bd.quantity * bd.price), 0)) "
        + "FROM BillDetailsEntity bd "
        + "JOIN bd.billEntity b "
        + "WHERE bd.deleted = false AND b.deleted = false "
        + "GROUP BY YEAR(b.createdDate) "
        + "ORDER BY YEAR(b.createdDate) DESC")
    List<RevenueYearDto> getRevenueYears();

    @Query("select new com.hunre.it.webstudyonline.model.dto.RevenueMonthDto( "
        + "year(b.createdDate), month(b.createdDate), coalesce(sum(bd.quantity * bd.price), 0)) "
        + "from BillDetailsEntity bd "
        + "join bd.billEntity b "
        + "where bd.deleted = false and b.deleted = false "
        + "group by year(b.createdDate), month(b.createdDate) "
        + "order by year(b.createdDate) desc, month(b.createdDate) desc ")
    List<RevenueMonthDto> getRevenueMonths();

    @Query("select new com.hunre.it.webstudyonline.model.dto.RevenueWeekDto( "
        + "year(b.createdDate), week(b.createdDate), coalesce(sum(bd.price *  bd.quantity), 0) ) "
        + "from BillDetailsEntity bd "
        + "join bd.billEntity b "
        + "where b.deleted = false and bd.deleted = false "
        + "group by year(b.createdDate), week(b.createdDate) "
        + "order by year(b.createdDate) desc, week(b.createdDate) desc")
    List<RevenueWeekDto> getRevenueWeeks();

    @Query("select new com.hunre.it.webstudyonline.model.dto.CourseRevenueDto( "
        + "c.code, i.url, c.name, count(bd.id), coalesce(sum(bd.price * bd.quantity), 0) ) "
        + "from BillDetailsEntity bd "
        + "join bd.courseEntity c "
        + "left join ImagesEntity i on i.courseEntity = c "
        + "where bd.deleted = false and c.deleted = false "
        + "group by c.code, i.url, c.name "
        + "order by coalesce(sum(bd.price * bd.quantity), 0) desc limit 5")
    List<CourseRevenueDto> getCourseRevenues();

    @Query("select new com.hunre.it.webstudyonline.model.dto.CategoryRevenueDto( "
        + "cate.name, coalesce(sum(bd.quantity * bd.price), 0) ) "
        + "from BillDetailsEntity bd "
        + "join bd.courseEntity c "
        + "join c.categoryEntity cate "
        + "where bd.deleted=false and c.deleted=false and cate.deleted=false "
        + "group by cate.name")
    List<CategoryRevenueDto> getCategoryRevenues();

    @Query("select bd from BillDetailsEntity bd " +
        "join bd.courseEntity c " +
        "join bd.billEntity b " +
        "where bd.deleted = false and b.deleted = false and c.deleted = false " +
        "and (bd.createdDate >= :startDate or :startDate is null) " +
        "and (bd.createdDate <= :endDate or :endDate is null) " +
        "order by bd.createdDate desc")
    List<BillDetailsEntity> findCreatedDateBetween(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate);
}
