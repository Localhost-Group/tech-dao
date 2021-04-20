const hre = require("hardhat");


async function main() {
  await hre.run("compile");

  const offersContract = await hre.ethers.getContractFactory("HelpOffers");
  const offers = await offersContract.deploy();
  await offers.deployed();

  const provider = hre.ethers.providers.getDefaultProvider()
  const wallet = hre.ethers.Wallet.createRandom().connect(provider)

  const [deployer, student1, teacher2, teacher3, student2, mentor, ...rest] = await hre.ethers.getSigners()

  console.log('deployer', deployer.address)
  console.log('contract', offers.address)
  console.log('wallet', wallet.address,'\n\n')

  console.log('student1', student1.address)
  console.log('student2', student2.address)

  console.log('teacher2', teacher2.address)
  console.log('teacher3', teacher3.address)
  console.log('mentor', mentor.address)

  // offers.on('OfferAdded', () => {
  //   console.log('on', arguments)
  // })

  let connectedContract = await offers.connect(student1)

  const newoffer = await connectedContract.addNewOffer(
    'Lorem ipsum', 'Link', [teacher2.address, teacher3.address])

  connectedContract = await offers.connect(teacher2)

  const newoffera = await connectedContract.addNewOffer(
    'Lorem ipsum', 'Link', [teacher2.address, teacher3.address])

  // const newoffer2 = await connectedContract.addNewOffer(
  //   'Lorem ipsum', 'Link', [teacher2.address, teacher3.address])

  // connectedContract = await offers.connect(teacher3)

  // const newoffer3 = await connectedContract.addNewOffer(
  //   'Lorem ipsum', 'Link', [teacher2.address, teacher3.address])


  connectedContract = await offers.connect(mentor)
  const offering = await connectedContract.makeOfferBid(teacher2.address)

  // const offering = await connectedContract.makeOfferBid(teacher2.address) 

  console.log('offering ', offering)
  // console.log('new offer created ', newoffer2)
  // console.log('new offer created ', newoffer3)


  // const newoffer2 = await offers.addNewOffer(student.address, 'Lorem ipsum', 'Link', [teacher2.address,teacher3.address])
  // console.log('new offer created ',  newoffer2.value.toNumber() )

  const offer = await offers.getOffer(student1.address)
  const offerents = await offers.getOfferents()

  // console.log('offer', offer)
  console.log('offerents', offerents)

  const checkOffering1 = await offers.checkOffering(student1.address, mentor.address)
  const checkOffering2 = await offers.checkOffering(teacher2.address, mentor.address)
  console.log('checkOffering', checkOffering1.toNumber())
  console.log('checkOffering', checkOffering2.toNumber())


  // const balanceToSend = await coin.balanceOf(teacher.address)

  // await coin.earnForLearning(teacher.address)
  // await coin.earnForLearning(teacher.address)

  // await coin.earnForLearning(teacher2.address)
  // await coin.earnForLearning(teacher2.address)

  // const balanceTeacher = await coin.balanceOf(teacher.address)
  // console.log("teacher", Number(balanceToSend), Number(balanceTeacher));

  // await coin.spend(teacher.address, teacher2.address, balanceToSend)

  // const balanceTeacherAfter = await coin.balanceOf(teacher.address)
  // const balanceTeacher2After = await coin.balanceOf(teacher2.address)
  // const balanceTeacher3After = await coin.balanceOf(teacher3.address)

  // console.log("balanceTeacherAfter", Number(balanceTeacherAfter));
  // console.log("balanceTeacher2After", Number(balanceTeacher2After));
  // console.log("balanceTeacher3After", Number(balanceTeacher3After));

  // const minted = await coin.minted()
  // console.log("minted", Number(minted), Number(balanceTeacherAfter) + Number(balanceTeacher2After));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
