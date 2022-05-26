import csv
from flask import Flask , jsonify, render_template , request
from flask_cors import CORS ,cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime

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

def add_batlino_data(data):
    date=datetime.datetime.now()
    mydata = batlino(data,date)
    db.session.add(mydata)
    db.session.commit()
    # return batlino_schema.jsonify(mydata)
    return"success"


data_list = []
sensor_data1=[]
sensor_data2=[]
sensor_data3=[]
sensor_data4=[]


files  = ["./Batlino - Signal Readings/opensignals_CC78AB5E8ECE_2022-04-28_12-00-53.txt","./Batlino - Signal Readings/opensignals_CC78AB5E8ECE_2022-04-28_12-15-25.txt",
          "./Batlino - Signal Readings/opensignals_CC78AB5E8ECE_2022-04-28_12-18-58.txt", "./Batlino - Signal Readings/opensignals_CC78AB62C78F_2022-04-28_12-23-22.txt"]

# for idx in range(4):
#     with open(files[idx]) as tsv:
with open(files[0]) as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"): #You can also use delimiter="\t" rather than giving a dialect.
        data_list.append(line)
    data_list = data_list [ 3: :]
    sensor_data1 = data_list
    data_list = []
print(sensor_data1[0][5])
print('data',data_list)

with open(files[1]) as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"): #You can also use delimiter="\t" rather than giving a dialect.
        data_list.append(line)
    data_list = data_list [ 3: :]
    sensor_data2 = data_list
    data_list = []
print(sensor_data2[0][5])
print('data',data_list)

with open(files[2]) as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"): #You can also use delimiter="\t" rather than giving a dialect.
        data_list.append(line)
    data_list = data_list [ 3: :]
    sensor_data3 = data_list
    data_list = []
print(sensor_data3[0][5])
print('data',data_list)

with open(files[3]) as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"): #You can also use delimiter="\t" rather than giving a dialect.
        data_list.append(line)
    data_list = data_list [ 3: :]
    sensor_data4 = data_list
    data_list = []
print(sensor_data4[0][5])
print('data',data_list)

all_list = [y for x in [sensor_data1, sensor_data2,sensor_data3,sensor_data4] for y in x]
# print(all_list)

# =======================Done
# for i in range(len(all_list)):
#     add_batlino_data(all_list[i][5])




# if __name__ == "__main__" :
#     app.run(host = '0.0.0.0',port = '3000',debug=True)
    # app.run(port = '3000',debug=True)

