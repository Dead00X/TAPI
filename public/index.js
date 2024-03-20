document.addEventListener('DOMContentLoaded', () => {
    const animalList = document.getElementById('animals'); // เลือก <ul> ที่มี id เป็น 'animals'
    const showAllButton = document.getElementById('showAllButton'); // เลือกปุ่ม 'Show All Animals'

    // ฟังก์ชันสำหรับแสดงข้อมูลสัตว์ทั้งหมด
    const showAllAnimals = async () => {
      try {
        const response = await fetch('/animals'); // เรียก API ที่จะได้ข้อมูลสัตว์ทั้งหมด
        const animals = await response.json(); // แปลง response เป็น JSON
        animalList.innerHTML = ''; // เคลียร์รายการสัตว์ที่มีอยู่ใน <ul> ก่อนแสดงข้อมูลใหม่
  
        animals.forEach(animal => {
          // สร้าง element <li> และกำหนดข้อมูลให้กับ element
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <h3>${animal.Name}</h3>
            <p>Breed: ${animal.Breed}</p>
            <p>Age: ${animal.Age}</p>
            <p>Gender: ${animal.Gender}</p>
            <p>Price: ${animal.Price}</p>
            <p>Status: ${animal.Status}</p>
            <p>Description: ${animal.Description}</p>
          `;
          animalList.appendChild(listItem); // เพิ่ม <li> ลงใน <ul>
        });
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    // เมื่อคลิกที่ปุ่ม 'Show All Animals' ให้เรียกฟังก์ชัน showAllAnimals
    showAllButton.addEventListener('click', showAllAnimals);
});
