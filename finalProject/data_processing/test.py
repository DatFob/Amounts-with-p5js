from nba_api.stats.static import players
from nba_api.stats.endpoints import shotchartdetail
import json
import pandas as pd


response = shotchartdetail.ShotChartDetail(
	team_id=0,
	player_id=202391,
	season_nullable='2011-12',
	season_type_all_star='Regular Season'
)

content = json.loads(response.get_json())

# transform contents into dataframe
results = content['resultSets'][0]
headers = results['headers']
rows = results['rowSet']
df = pd.DataFrame(rows)
df.columns = headers

# write to csv file
df.to_csv('jeremyLin 11-12 shot chart data', index=False)


