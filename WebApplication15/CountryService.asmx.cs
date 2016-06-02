using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace WebApplication15
{
    /// <summary>
    /// Summary description for CountryService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CountryService : System.Web.Services.WebService
    {

        [WebMethod]
        public void GetData()
        {
            List<Country> countryList = new List<Country>();

            string cs = ConfigurationManager.ConnectionStrings["PracticeDB"].ConnectionString;
            using(SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("Select * from Country;Select * from City",con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);

                DataView dataview = new DataView(ds.Tables[1]);

                foreach (DataRow countryDataRow in ds.Tables[0].Rows)
                {
                    Country country = new Country();
                    country.Id = Convert.ToInt32(countryDataRow["Id"]);
                    country.Name = Convert.ToString(countryDataRow["Name"]);

                    dataview.RowFilter = "CountryId = '" + country.Id + "'";

                    List<City> cityList = new List<City>();

                    foreach (DataRowView cityDataRowView in dataview)
                    {
                        DataRow cityDataRow = cityDataRowView.Row;

                        City city = new City();
                        city.Id = Convert.ToInt32(cityDataRow["Id"]);
                        city.Name = Convert.ToString(cityDataRow["Name"]);
                        city.CountryId = Convert.ToInt32(cityDataRow["CountryId"]);
                        cityList.Add(city);
                    }

                    country.Cities = cityList;
                    countryList.Add(country);
                }
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(countryList));

        }
    }
}
