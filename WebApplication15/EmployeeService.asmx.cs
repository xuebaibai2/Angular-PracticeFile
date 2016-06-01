using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

namespace WebApplication15
{
    /// <summary>
    /// Summary description for EmployeeService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class EmployeeService : System.Web.Services.WebService
    {

        [WebMethod]
        public void GetAllEmployees()
        {
            List<Employee> listEmployees = new List<Employee>();

            string cs = ConfigurationManager.ConnectionStrings["PracticeDB"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("Select * from Employees", con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Employee em = new Employee();
                    em.id = Convert.ToInt32(rdr["Id"]);
                    em.name = Convert.ToString(rdr["Name"]);
                    em.gender = Convert.ToString(rdr["Gender"]);
                    em.salary = Convert.ToInt32(rdr["Salary"]);
                    listEmployees.Add(em);
                }
            }

            JavaScriptSerializer js = new JavaScriptSerializer();

            Context.Response.Write(js.Serialize(listEmployees));
        }
    }
}
