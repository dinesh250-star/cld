// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Enroll{
    mapping(address => mapping(uint => uint)) subject;
    uint bc;
    uint nlp;
    uint mv;
    uint ai;
    
    event entered(bool success);
    constructor(){
        
    }


    
    function select(address user,uint sub) public {
        if(subject[user][sub] == 0){
            if(sub == 1){
                bc++;
                subject[user][sub] += 1;
                emit entered(true);
            }else if(sub == 2){
                nlp++;
                subject[user][sub] += 1;
                emit entered(true);
            }else if(sub == 3){
                mv++;
                subject[user][sub] += 1;
                emit entered(true);
            }else if(sub == 4){
                ai++;
                subject[user][sub] += 1;
                emit entered(true);
            }
        }else{
              emit entered(false);
        }
    }
    
    function show(uint sub) public view returns(uint){
        if(sub == 1){
            return bc;
        }else if(sub == 2){
            return nlp;
        }else if(sub == 3){
            return mv;
        }else if(sub == 4){
            return ai;
        }else{
            return 10;
        }
    }
}