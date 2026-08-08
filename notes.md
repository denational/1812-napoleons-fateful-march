## Implementation Notes
1. The optional rule to place orders simultaneously is enforced by default. The rules-strict version might become an option in the near future.

## Personal Rules Calls (to confirm with designer)
1. Poor Communications: Modified so that Russia clicks on a space to remove an order there. In case there are multiple orders in the location, a random order will be removed.
2. New Posting: Added new requirement for relocation destination area, that the target area must have a Russian SP. 
    pg 5 - "Leaders are eliminated if they are ever in an area with no friendly SPs. "
3. Are non-Russian key cities eligible for Holy Mother Russia (FR)
4. Are cavalry patrols orders that are not executed because there are no enemy troops in the vicinity removed?
5. Can you place Forced March/Cavalry Patrols with Good Leadership?
6. Retreat/Evade without any depot markers -> currently goes to nearest supply source to which a path can be traced
7. Fickle Habsburgs: is there pursuit?
8. How do Platov's Cossacks and Crumbling Cohesion stack (i.e. are they cumulative)?
9. If RU doesn't have initiative, crumbling cohesion result is 0?

## Known Bugs (to fix at a later time)
1. attrition has not been done yet - as are events depending on attrition losses
2. nested log boxes break
3. holy mother russia (fr) doesn't work entirely as expected
4. energetic leadership is not enforced
5. new posting/good leadership - check seniority for equal leaders
6. depot removed -> must discard card
7. bagration's retreat
8. leaders can be left behind alone
9. good leadership - no more actions select order if no orders executable
10. hard marching, fast marching, exhausting march losses not yet applied
11. evade remove depot
12. not applied - onl taken hits count
13. retreat with no valid path not handled yet (not enough test cases yet)
14. display bug - prussian troops exhausted on connection disappear (battle of riga)
15. combine forces in battle step
