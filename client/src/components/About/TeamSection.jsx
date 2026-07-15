import { motion } from "framer-motion";
import "./TeamSection.css";

import member1 from "../../../public/team-members/member1.jpg";
import member2 from "../../../public/team-members/member2.jpg";
import member3 from "../../../public/team-members/member3.jpg";
import member4 from "../../../public/team-members/member4.jpg";


const team = [
    {
        id: 1,
        image: member1,
        name: "Alex Carter",
        role: "Founder & CEO",
    },
    {
        id: 2,
        image: member2,
        name: "Sophia Brown",
        role: "Design Engineer",
    },
    {
        id: 3,
        image: member3,
        name: "James Wilson",
        role: "Product Manager",
    },
    {
        id: 4,
        image: member4,
        name: "Emily Davis",
        role: "Marketing Lead",
    },
];

const TeamSection = () => {
    return (
        <section className="team-section">

            <motion.div
                className="team-heading"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <h5>OUR TEAM</h5>
                <h2>Meet The People Behind TurboToys</h2>
                <p>
                    Passionate professionals working together to build
                    premium RC vehicles and unforgettable experiences.
                </p>
            </motion.div>

            <div className="team-grid">

                {team.map((member, index) => (

                    <motion.div
                        key={member.id}
                        className="team-card"
                        initial={{ opacity: 0, y: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.1,

                        }}
                        viewport={{ once: true }}
                        whileHover={{
                            y: -10,
                        }}
                    >

                        <img src={member.image} alt={member.name} />
                        <h3>{member.name}</h3>
                        <span>{member.role}</span>
                    </motion.div>

                ))}

            </div>

        </section>
    );
};

export default TeamSection;