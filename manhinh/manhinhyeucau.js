import React, { useState } from "react";
import DatePicker from "react-native-date-picker";
import ImageCropPicker from "react-native-image-crop-picker";
import { launchCamera,launchImageLibrary,ImageLibraryOptions } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { Alert, Button, Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
var getAPI="https://659afb12d565feee2daabc7f.mockapi.io/InformationStudent";
const Manhinh = () => { 
    [hoten, sethoten] = useState('');
    [tuoi, settuoi] = useState('');
    [ngaysinh, setngaysinh] = useState(new Date());
    [quequan, setquequan] = useState('');
    [hinhanh, sethinhanh] = useState('');
   [base64image, setbase64image] = useState('');
    [open, setopen] = useState(false);
    var dem=0;
  
    
   
   
    const Imagepicker= ()=>{
        const options :ImageLibraryOptions ={
                mediaType:'photo',
                includeBase64:true,
                maxWidth:675,
                maxHeight:1200

          };
         
        launchImageLibrary(options,response=>{
            sethinhanh(response.assets[0].uri);
            setbase64image("data:"+response.assets[0].type+";base64,"+response.assets[0].base64);
          //  console.log(responsee.assets[0].base64);
          console.log("data:"+response.assets[0].type+";base64,"+response.assets[0].base64);
        });
    };
    const CreateStudent=()=>{
        if(hoten==="")
        {
            Alert.alert("Bạn chưa nhập họ tên!!!!");
        }else if(tuoi==="")
        {
            Alert.alert("Bạn chưa nhập tuổi!!!!!");
        }else if(quequan==="")
        {
            Alert.alert("Bạn chưa nhập quê quán");
        }else if(!hinhanh)
        {
            Alert.alert("Bạn chưa chọn ảnh");
        }else{
            var formdata={
                Name:hoten,
                Age:tuoi,
                Date:ngaysinh.toString(),
                Address:quequan,
                Image:base64image,
             };
            
            var options={
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formdata)
                
            };
            
            fetch(getAPI,options)
            .then(function(response)
            {
                
                return response.json();
            }
            ).then(function(){
                if(dem==0)
                {
                    Alert.alert("Gửi thành công");
                }
            })
            .catch(function(){
                Alert.alert("Gửi thất bại");
                dem++;
            });
            
        }
       
    }
            
           
        
    
    return (<SafeAreaView style={{
        flex: 1
    }}>

        <View style={{
            height: '10%',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: '#245d7c'

            }}>THÔNG TIN SINH VIÊN</Text>
        </View>
        <View style={{
            height: '40%',
            marginTop: 10,

        }}>
            <View style={{
                height: '20%',
                flexDirection: 'row',
            }}>
                <View style={{
                    justifyContent: 'center',
                    width: '30%'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#245d7c',
                        marginLeft: 10
                    }}>
                        Họ và tên:
                    </Text>
                </View>

                <View style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '70%',


                }}>
                    <TextInput style={{
                        fontSize: 18,
                        height: '100%',
                        width: '100%',
                        color: 'red'
                    }} onChangeText={text=>sethoten(text)} value={hoten}/>
                </View>
            </View>
            <View style={{
                height: '20%',
                flexDirection: 'row',
                marginTop: 10,
            }}>
                <View style={{
                    justifyContent: 'center',
                    width: '30%'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#245d7c',
                        marginLeft: 10
                    }}>
                        Tuổi:
                    </Text>
                </View>

                <View style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '70%'
                }}>
                    <TextInput style={{
                        fontSize: 18,
                        height: '100%',
                        color: 'red'
                    }} onChangeText={text=>settuoi(text)} value={tuoi}/>
                </View>
            </View>
            <View style={{
                height: '20%',
                flexDirection: 'row',
                marginTop: 10,
            }}>
                <View style={{
                    justifyContent: 'center',
                    width: '30%'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#245d7c',
                        marginLeft: 10
                    }}>
                        Ngày sinh:
                    </Text>
                </View>

                <TouchableOpacity style={{
                    width: '70%',

                }} onPress={() => {
                    setopen(!open);
                }}>
                    <View style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        width: '100%'
                    }}>
                        <DatePicker
                            modal
                            mode="date"
                            open={open}
                            date={ngaysinh}
                            onConfirm={(ngaysinh) => {
                                setopen(false)
                                setngaysinh(ngaysinh)
                            }}
                            onCancel={() => {
                                setopen(false)
                            }}
                        />
                        <TextInput style={{
                            fontSize: 18,
                            height: '100%',
                            color: 'red'
                        }} readOnly={true} value={ngaysinh.toLocaleDateString("vi-VN").toString()}/>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{
                height: '20%',
                flexDirection: 'row',
                marginTop: 10,
            }}>
                <View style={{
                    justifyContent: 'center',
                    width: '30%'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#245d7c',
                        marginLeft: 10
                    }}>
                        Quê quán:
                    </Text>
                </View>

                <View style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '70%'
                }}>
                    <TextInput style={{
                        fontSize: 18,
                        height: '100%',
                        color: 'red'
                    }} onChangeText={text=>setquequan(text)} value={quequan}/>
                </View>
            </View>
            <View style={{
                height: '20%',
                flexDirection: 'row',
                marginTop: 10,
            }}>
                <View style={{
                    justifyContent: 'center',
                    width: '30%'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#245d7c',
                        marginLeft: 10
                    }}>
                        Hình ảnh:
                    </Text>
                </View>
                <View style={{
                    flexDirection:'row'
                }}>
                <View style={{
                    borderWidth:1,
                    width:90,
                    height:100,
                    borderRadius:5
                }}>
                   <Image style={{
                    width:'100%',
                    height:'100%',
                    resizeMode:'stretch'
                   }} source={{uri:hinhanh}}/>
                </View>
                <View style={{
                    width:100,
                    height:100,
                    marginLeft:10
                }}>
                <Button title="Chọn ảnh" onPress={Imagepicker} style={{
                }}/>
                </View>
                
                </View>
              

            </View>
            <View style={{
                height: '20%',
                backgroundColor: 'red',
                marginTop: 50,
                justifyContent: 'center',
                alignContent: 'center',
                width: '70%',
                marginLeft: 123,
                borderRadius: 10
            }}>
                <TouchableOpacity style={{
                    height: '100%',
                    backgroundColor: '#245d7c',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10
                }} onPress={CreateStudent
                   
                }>
                    <Text style={{
                        fontSize: 20,
                        color: 'white'
                    }}>
                        Gửi
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>);
}
export default Manhinh