## Rankster

Rankster is merely a gamified list that users should sort according to their values.
![alt text](https://preview.ibb.co/fUtR0v/Screen_Shot_2017_05_22_at_2_18_24_PM.png)



#### Install
1. Create a Google Sheet that has 2 sub sheets
2. **In the first sheet**, create 2 columns, call the first one 'country' and the second 'score', and then list all your values.
3. **In the second sheet**, create 6 colums and name them in this order:
- Title
- Description
- Items	
- Source
- Twitter
- Canonical 
- HighestOnTop
- Conclusion

Then fill the values

4. Then share the Google Sheet with the public , copy its URL, and paste it in js/scripts inside init() function.


#### The fields
1. Title (Text): The main title
2. Description (Text): the description 
3. Items (Number): the number of items to appear in the list
4. Twitter (Text): the tweet text
5. Canonical (Link): the main URL
6. Source (link): Link to data source
7. Highest on top (True or False): The highest value either on top or bottom, your choice.
8. Conclusion (text): The text that will appear next to the item when the sorting is completed successfully 

Example: https://docs.google.com/spreadsheets/d/12CSYHWSxXwUvfpoUaKjQNkcx88WcCwqovs_-Cg45Vrw/edit#gid=1305765886
