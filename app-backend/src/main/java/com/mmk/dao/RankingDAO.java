package com.mmk.dao;

import java.util.List;

import com.mmk.entity.BadgeEntity;

public interface RankingDAO {
    List<BadgeEntity> getBadgesForPreviousMonth(String previousMonth);
}
