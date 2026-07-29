## Implementation Notes
1. The optional rule to place orders simultaneously is enforced by default. The rules-strict version might become an option in the near future.

## Personal Rules Calls (to confirm with designer)
1. Poor Communications: Modified so that Russia clicks on a space to remove an order there. In case there are multiple orders in the location, a random order will be removed.
2. New Posting: Added new requirement for relocation destination area, that the target area must have a Russian SP. 
    pg 5 - "Leaders are eliminated if they are ever in an area with no friendly SPs. "
3. Are non-Russian key cities eligible for Holy Mother Russia (FR)
4. Are cavalry patrols orders that are not executed because there are no enemy troops in the vicinity removed?
5. Can you place Forced March/Cavalry Patrols with Good Leadership?

## Known Bugs (to fix at a later time)
1. ~~can_play_event() is broken and always returns true - this is useful now for testing events, so I'll let it be~~
2. ~~seniority needs to be enforced~~
3. attrition has not been done yet - as are events depending on attrition losses
4. ~~mark_already_moved() will overwrite - need to rewrite to add, not duplicate~~
5. nested log boxes break
6. holy mother russia (fr) doesn't work entirely as expected
7. ~~remove order entries from areas that have only troops that have already executed a forced march/march order~~
8. ~~alexander ability not done yet: will do after asking designer~~
9. platov ability (both) need to be implemented
10. ~~new posting - fix alexander~~
11. ~~Molodechno is not adjacent to Minsk?~~
12. energetic leadership is not enforced
13. ~~move - update vp for vp cities~~
14. new posting/good leadership - check seniority for equal leaders
15. ~~evasive maneuvers not implemented~~
16. depot removed -> must discard card
17. bagration's retreat
18. leaders can be left behind alone
19. ~~cavalry leader mat layout has same issue as special layout~~
20. good leadership - no more actions select order if no orders executable
21. hard marching, fast marching, exhausting march losses not yet applied
