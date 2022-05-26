from flask import Flask , jsonify, render_template , request
from flask_cors import CORS ,cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime
import json

app = Flask(__name__)
CORS(app, support_credentials=True)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:mysql@localhost/icu' #mysql://username:password@server/db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), default = 'patient_1')
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))
    role = db.Column(db.String(100), default = 'patient')
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, name, email, password,role):
        self.name = name
        self.email = email
        self.password = password
        self.role = role

class RoomsD(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer)
    doctor_id = db.Column(db.Integer)
   
    def __init__(self, room_id, doctor_id):
        self.room_id = room_id
        self.doctor_id = doctor_id

class RoomsP(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer)
    patient_id = db.Column(db.Integer)
   
    def __init__(self, room_id, patient_id):
        self.room_id = room_id
        self.patient_id = patient_id

class PatientData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer)
    sensor1 = db.Column(db.Integer)
    sensor2 = db.Column(db.Integer)
    date = db.Column(db.DateTime, default = datetime.datetime.now)
   
    def __init__(self, patient_id , sensor1, sensor2,date):
        self.patient_id = patient_id
        self.sensor1 = sensor1
        self.sensor2 = sensor2
        self.date =date

class batlino(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.Integer)
    # data2 = db.Column(db.String(100))
    # data3 = db.Column(db.String(100))
    # data4 = db.Column(db.String(100))
    date = db.Column(db.DateTime, default = datetime.datetime.now)
   
    def __init__(self, data,date): #,data2,data3,data4
        self.data = data
        # self.data2 = data2
        # self.data3 = data3
        # self.data4 = data4
        self.date =date

    
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password', 'role', 'date')

class RoomDSchema(ma.Schema):
    class Meta:
        fields = ('id','room_id','doctor_id')

class RoomPSchema(ma.Schema):
    class Meta:
        fields = ('id','room_id','patient_id' )

class PatientDataSchema(ma.Schema):
    class Meta:
        fields = ('id','patient_id' , 'sensor1','sensor2','date' )


class batlinoSchema(ma.Schema):
    class Meta:
        fields = ('id','data','date' ) #,'data2','data3','data4'

user_schema = UserSchema()
users_schema = UserSchema(many=True)

roomD_schema = RoomDSchema()
roomsD_schema = RoomDSchema(many=True)

roomP_schema = RoomPSchema()
roomsP_schema = RoomPSchema(many=True)

PatientData_schema = PatientDataSchema()
PatientsData_schema = PatientDataSchema(many=True)

batlino_schema = batlinoSchema()
batlinos_schema = batlinoSchema(many=True)

# db.create_all()

DOCTOR_ID = 0
ROOM_ID = 0
PATIENT_ID = 0
LED_STATE = 'OFF'
SIGNAL_STATE = 'ON'

# REGISTER
@app.route('/register', methods = ['POST'])
@cross_origin(supports_credentials=True)
def register():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    print(name,email,password)
    users = Users(name, email, password , 'patient')
    db.session.add(users)
    db.session.commit()
    return user_schema.jsonify(users)

# LOGIN
@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    print (email,password)
    user = Users.query.filter_by(email = email)
    if user[0].role == 'doctor':
        userName = user[0].name
        userId = user[0].id
        data = jsonify(userName,userId)
        print('data',data)
        print(userName,userId)
        global DOCTOR_ID
        DOCTOR_ID = userId  
    return data
  
    
# getRooms
@app.route('/getRooms', methods=['GET'])
def getRooms():
    global DOCTOR_ID
    rooms = RoomsD.query.filter_by(doctor_id = DOCTOR_ID).all()
    results = roomsD_schema.dump(rooms)
    print(results)
    return jsonify(results)

# postRooms
@app.route('/postRooms', methods=['POST'])
def postRooms():
    global ROOM_ID
    ROOM_ID = request.json['room_id']
    print('ROOM_ID',ROOM_ID)
    return jsonify(ROOM_ID)

# getPatients by room id
@app.route('/getPatients', methods=['GET'])
def getPatients():
    global ROOM_ID
    patients = RoomsP.query.filter_by(room_id = ROOM_ID).all()
    results = roomsP_schema.dump(patients)
    print(results)
    return jsonify(results)

# postRooms
@app.route('/postPatients', methods=['POST'])
def postPatients():
    global PATIENT_ID
    PATIENT_ID = request.json['patient_id']
    print('PATIENT_ID',PATIENT_ID)
    return jsonify(PATIENT_ID)

# getPatient by patient id
@app.route('/getPatient', methods=['GET'])
def getPatient():
    global PATIENT_ID
    patientData = PatientData.query.get(PATIENT_ID)
    results = PatientData_schema.dump(patientData)
    print(results)
    return jsonify(results)


# getPatientName by patient id
@app.route('/getPatientName', methods=['GET'])
def getPatientName():
    global PATIENT_ID
    patient = Users.query.get(PATIENT_ID)
    results = user_schema.dump(patient)
    print('getPatientName',results)
    return jsonify(results)

# getSensor1 by patient id
@app.route('/getSensor1', methods=['GET'])
def getSensor1():
    global PATIENT_ID
    patientDatan = PatientData.query.filter_by(patient_id = PATIENT_ID).order_by(PatientData.id.desc()).limit(10).all()
    results = PatientsData_schema.dump(patientDatan)
    # print(results)
    results.reverse()
    return jsonify(results)

# getSensor2 by patient id
@app.route('/getSensor2', methods=['GET'])
def getSensor2():
    global PATIENT_ID
    patientDatan = PatientData.query.filter_by(patient_id = PATIENT_ID).order_by(PatientData.id.desc()).limit(10).all()
    results = PatientsData_schema.dump(patientDatan)
    # print(results)
    results.reverse()
    return jsonify(results)
    # batlinoo = batlino.query.order_by(batlino.id.desc()).limit(10).all()
    # results = batlinos_schema.dump(batlinoo)
    # results.reverse()
    # return jsonify(results)

# getSensor2 by patient id
@app.route('/getBatlino', methods=['GET'])
def getBatlino():
    # global PATIENT_ID
    # patientDatan = PatientData.query.filter_by(patient_id = PATIENT_ID).order_by(PatientData.id.desc()).limit(10).all()
    # results = PatientsData_schema.dump(patientDatan)
    # # print(results)
    # results.reverse()
    # return jsonify(results)
    batlinoo = batlino.query.order_by(batlino.id.desc()).limit(200).all()
    results = batlinos_schema.dump(batlinoo)
    results.reverse()
    return jsonify(results)
   


# Toggle led
@app.route('/toggleLed', methods=['POST'])
def toggleLed():
    global LED_STATE
    state = request.json['ledStatus']
    print ('state',state)
    LED_STATE = state
    return jsonify(state)

# Toggle signal state
@app.route('/toggleSignal', methods=['POST'])
def toggleSignal():
    global SIGNAL_STATE
    state = request.json['signalStatus']
    print ('sig state',state)
    SIGNAL_STATE = state
    return jsonify(state)

# send state to esp
@app.route('/change-state', methods=['GET'])
def sendState():
    global LED_STATE
    if LED_STATE == 'OFF':
        led_state = {"id":2,"active":0}
        json_dump = json.dumps(led_state)
        print(json_dump)
    else:
        led_state = {"id":2,"active":1}
        json_dump = json.dumps(led_state)
        print(json_dump)
    return json_dump

# get data from esp
@app.route('/', methods=['GET'])  #readSensor
def readSensor():
    global PATIENT_ID
    global SIGNAL_STATE
    if SIGNAL_STATE =='ON':
        data1 = request.args.get('sensor1', None)
        data2 = request.args.get('sensor2', None)
        if data1 == None:
            data1 =0
        if data2 == None:
            data2 =0   
        date=datetime.datetime.now()
        sensors = PatientData(patient_id= PATIENT_ID, sensor1=data1, sensor2=data2 ,date=date )
        db.session.add(sensors)
        db.session.commit()
    
    return PatientData_schema.jsonify(sensors)
    # print('data::',data1,data2)
    # return 'success'
   
# #==================================================================

# # GET ALL users
# @app.route('/getUsers', methods = ['GET'])
# def get_users():
#     all_users = Users.query.all()
#     results = users_schema.dump(all_users)
#     return jsonify(results)
  

# # GET user BY ID
# @app.route('/get/<id>/', methods = ['GET'])
# def user_details(id):
#     user = Users.query.get(id)
#     return user_schema.jsonify(user)





if __name__ == "__main__" :
    app.run(host = '0.0.0.0',port = '3000')
    # app.run(port = '3000',debug=True)



