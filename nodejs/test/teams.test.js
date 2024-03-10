const request = require("supertest");
const Teams = require("../src/mongoose/models/teams");
const Members = require("../src/mongoose/models/members");
const app = require("../src/app");
const {members, setUpDataBase, teams} = require("./utils/testDB");

beforeEach(setUpDataBase);

//adding a team member with valid details
test("Adding a new member", async () => {
    await request(app).post("/tracker/members/add").send({
        employee_id: 1685742,
        employee_name: "New Employee",
        technology_name: "Node.js",
        experience: 2,
    })
    .expect(201);
    const members = await Members.find();
    const teams = await Teams.find();
    expect(members.length).toBe(5);
    expect(teams.length).toBe(3);
});

//adding a team member with valid details
test("Adding a new member", async () => {
    await request(app).post("/tracker/members/add").send({
        employee_id: 1685742,
        employee_name: "New Employee",
        technology_name: "Big Data",
        experience: 2,
    })
    .expect(201);
    const members = await Members.find();
    const teams = await Teams.find();
    expect(members.length).toBe(5);
    expect(teams.length).toBe(4);
});

//adding an already existing team member
test("Adding a new member", async () => {
    const response = await request(app).post("/tracker/members/add").send({
        employee_id: members[0].employee_id,
        employee_name: members[0].employee_name,
        technology_name: members[0].technology_name,
        experience: members[0].experience,
    })
    .expect(400);
    expect(response.body).toMatchObject({
        error: "Member with same team already exists",
    });
});

//adding a team member with invalid employee name
test("Adding a new member with invalid employee name", async () => {
    await request(app).post("/tracker/members/add").send({
        employee_id: 1685757,
        employee_name: "Ne",
        technology_name: "Node.js",
        experience: 2,
    })
    .expect(400);
});

//adding a team member with invalid employee name
test("Adding a new member with invalid employee name", async () => {
    await request(app).post("/tracker/members/add").send({
        employee_id: 1685757,
        employee_name: "Employee@",
        technology_name: "Node.js",
        experience: 2,
    })
    .expect(400);
});

//adding a team member with invalid employee name
test("Adding a new member with invalid employee name", async () => {
    await request(app).post("/tracker/members/add").send({
        employee_id: 1685757,
        employee_name: "Employee1",
        technology_name: "Node.js",
        experience: 2,
    })
    .expect(400);
});

//adding a team member with invalid experience
test("Adding a new member with invalid experience", async () => {
    await request(app).post("/tracker/members/add").send({
        employee_id: 1685757,
        employee_name: "Employee",
        technology_name: "Node.js",
        experience: -1,
    })
    .expect(400);
});

//adding a team member without employee id
test("Adding a new member without employee id", async () => {
    await request(app).post("/tracker/members/add").send({
        employee_name: "Employee",
        technology_name: "Node.js",
        experience: 2,
    })
    .expect(400);
});

//adding a team member without employee name
test("Adding a new member without employee name", async () => {
    await request(app).post("/tracker/members/add").send({
        employee_id: 1236547,
        technology_name: "Node.js",
        experience: 2,
    })
    .expect(400);
});

//adding a team member without experience
test("Adding a new member without experience", async () => {
    await request(app).post("/tracker/members/add").send({
        employee_id: 1236547,
        employee_name: "Employee",
        technology_name: "Node.js"
    })
    .expect(400);
});

//adding a team member without technology name
test("Adding a new member without technology name", async () => {
    await request(app).post("/tracker/members/add").send({
        employee_id: 1236547,
        employee_name: "Employee",
        experience: 2,
    })
    .expect(400);
});

//getting technologies from db
test("Getting technologies from DB", async () => {
    const response = await request(app).get("/tracker/technologies/get")        
        .expect(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0].name).toBe(teams[0].name);
    expect(response.body[1].name).toBe(teams[1].name);
    expect(response.body[2].name).toBe(teams[2].name);
});

//adding technologies to dropdown
test("Adding a new technology to the dropdown", async () => {
    await request(app).post("/tracker/technologies/add")        
        .send({
            technology_name: "Big Data"
        }).expect(201);
    const techs = await Teams.find();
    expect(techs.length).toBe(4);
});

//adding technologies to dropdown
test("Adding a new technology to the dropdown", async () => {
    await request(app).post("/tracker/technologies/add")        
        .send({
            technology_name: "Node.js"
        }).expect(400);
});

//removing technologies to dropdown
test("Removing a new technology to the dropdown", async () => {
    await request(app).delete(`/tracker/technologies/remove/${teams[0].name}`)        
        .expect(200);
    const techs = await Teams.find();
    expect(techs.length).toBe(2);
    const members = await Members.find();
    expect(members.length).toBe(2);
});

//getting all the members from the DB
test("Getting members from DB", async () => {
    const response = await request(app).get("/tracker/members/display")        
        .expect(200);
    expect(response.body.length).toBe(4);
    expect(response.body[0].employee_id).toBe(members[0].employee_id);
    expect(response.body[1].employee_name).toBe(members[1].employee_name);
    expect(response.body[2].technology_name).toBe(members[2].technology_name);
    expect(response.body[3].experience).toBe(members[3].experience);
});
